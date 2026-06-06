-- ==========================================
-- BRIDGING SILENCE - SUPABASE SCHEMA & RLS
-- ==========================================

-- 1. Create Custom ENUM Types safely
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('admin', 'ml_engineer', 'linguist', 'community_liaison', 'content_creator', 'user');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'validation_status') THEN
    CREATE TYPE validation_status AS ENUM ('pending', 'approved', 'rejected');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'feedback_category') THEN
    CREATE TYPE feedback_category AS ENUM ('bug', 'feature_request', 'cultural_context', 'general');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ticket_status') THEN
    CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'post_status') THEN
    CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');
  END IF;
END$$;

-- ==========================================
-- 2. Create Tables
-- ==========================================

-- PROFILES (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  role user_role DEFAULT 'user'::user_role NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- TSL DICTIONARY
CREATE TABLE IF NOT EXISTS tsl_dictionary (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sign_meaning TEXT NOT NULL,
  video_url TEXT,
  status validation_status DEFAULT 'pending'::validation_status NOT NULL,
  validated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  notes TEXT,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- USER FEEDBACK / TESTING SESSIONS
CREATE TABLE IF NOT EXISTS user_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  feedback_text TEXT NOT NULL,
  category feedback_category DEFAULT 'general'::feedback_category NOT NULL,
  status ticket_status DEFAULT 'open'::ticket_status NOT NULL,
  sentiment_rating INT CHECK (sentiment_rating >= 1 AND sentiment_rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- CONTENT POSTS (Announcements, Tutorials)
CREATE TABLE IF NOT EXISTS content_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content_body TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status post_status DEFAULT 'draft'::post_status NOT NULL,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- USAGE METRICS (For tracking success)
CREATE TABLE IF NOT EXISTS usage_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  translation_latency_ms INT,
  is_successful BOOLEAN DEFAULT TRUE,
  platform TEXT,
  session_date TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- SUPPORT TICKETS
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submitter_name TEXT,
  submitter_email TEXT,
  message TEXT NOT NULL,
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status ticket_status DEFAULT 'open'::ticket_status NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);


-- ==========================================
-- 3. Row Level Security (RLS) Policies
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tsl_dictionary ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Helper functions to get the current user's role (created in both public and auth schemas for compatibility)
CREATE OR REPLACE FUNCTION public.get_user_role() RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION auth.get_user_role() RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;


-- PROFILES POLICIES
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id OR public.get_user_role() = 'admin'::user_role);


-- TSL DICTIONARY POLICIES
DROP POLICY IF EXISTS "Everyone can view approved signs" ON tsl_dictionary;
CREATE POLICY "Everyone can view approved signs" ON tsl_dictionary FOR SELECT USING (status = 'approved');

DROP POLICY IF EXISTS "Staff can view all signs" ON tsl_dictionary;
CREATE POLICY "Staff can view all signs" ON tsl_dictionary FOR SELECT USING (
  public.get_user_role() IN ('admin', 'ml_engineer', 'linguist')
);

DROP POLICY IF EXISTS "Staff can insert signs" ON tsl_dictionary;
CREATE POLICY "Staff can insert signs" ON tsl_dictionary FOR INSERT WITH CHECK (
  public.get_user_role() IN ('admin', 'ml_engineer', 'linguist')
);

DROP POLICY IF EXISTS "Staff can update signs" ON tsl_dictionary;
CREATE POLICY "Staff can update signs" ON tsl_dictionary FOR UPDATE USING (
  public.get_user_role() IN ('admin', 'ml_engineer', 'linguist')
);


-- USER FEEDBACK POLICIES
DROP POLICY IF EXISTS "Users can insert feedback" ON user_feedback;
CREATE POLICY "Users can insert feedback" ON user_feedback FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Staff can view feedback" ON user_feedback;
CREATE POLICY "Staff can view feedback" ON user_feedback FOR SELECT USING (
  public.get_user_role() IN ('admin', 'community_liaison')
);

DROP POLICY IF EXISTS "Staff can update feedback" ON user_feedback;
CREATE POLICY "Staff can update feedback" ON user_feedback FOR UPDATE USING (
  public.get_user_role() IN ('admin', 'community_liaison')
);


-- CONTENT POSTS POLICIES
DROP POLICY IF EXISTS "Everyone can view published posts" ON content_posts;
CREATE POLICY "Everyone can view published posts" ON content_posts FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Staff can view all posts" ON content_posts;
CREATE POLICY "Staff can view all posts" ON content_posts FOR SELECT USING (
  public.get_user_role() IN ('admin', 'content_creator')
);

DROP POLICY IF EXISTS "Staff can manage posts" ON content_posts;
CREATE POLICY "Staff can manage posts" ON content_posts FOR ALL USING (
  public.get_user_role() IN ('admin', 'content_creator')
);


-- USAGE METRICS POLICIES
DROP POLICY IF EXISTS "App can insert metrics" ON usage_metrics;
CREATE POLICY "App can insert metrics" ON usage_metrics FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'anon');

DROP POLICY IF EXISTS "Admins and ML can view metrics" ON usage_metrics;
CREATE POLICY "Admins and ML can view metrics" ON usage_metrics FOR SELECT USING (
  public.get_user_role() IN ('admin', 'ml_engineer')
);


-- SUPPORT TICKETS POLICIES
DROP POLICY IF EXISTS "Anyone can insert tickets" ON support_tickets;
CREATE POLICY "Anyone can insert tickets" ON support_tickets FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can manage tickets" ON support_tickets;
CREATE POLICY "Staff can manage tickets" ON support_tickets FOR SELECT USING (
  public.get_user_role() IN ('admin', 'community_liaison')
);

DROP POLICY IF EXISTS "Staff can update tickets" ON support_tickets;
CREATE POLICY "Staff can update tickets" ON support_tickets FOR UPDATE USING (
  public.get_user_role() IN ('admin', 'community_liaison')
);

-- ==========================================
-- 4. Triggers (Optional but recommended)
-- ==========================================
-- Automatically update 'updated_at' timestamps
CREATE OR REPLACE FUNCTION handle_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_profiles_updated ON profiles;
CREATE TRIGGER on_profiles_updated BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

DROP TRIGGER IF EXISTS on_tsl_dictionary_updated ON tsl_dictionary;
CREATE TRIGGER on_tsl_dictionary_updated BEFORE UPDATE ON tsl_dictionary FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

DROP TRIGGER IF EXISTS on_content_posts_updated ON content_posts;
CREATE TRIGGER on_content_posts_updated BEFORE UPDATE ON content_posts FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
