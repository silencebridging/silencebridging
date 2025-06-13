import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Create the landmarks directory if it doesn't exist
    const landmarksDir = path.join(process.cwd(), 'src', 'app', 'services', 'signToSpeech', 'landmarks');
    
    if (!fs.existsSync(landmarksDir)) {
      fs.mkdirSync(landmarksDir, { recursive: true });
    }
    
    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `hand_landmarks_${timestamp}.json`;
    const filePath = path.join(landmarksDir, filename);
    
    // Write the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      message: `Saved ${data.length} landmarks to ${filename}`,
      path: filePath
    });
  } catch (error) {
    console.error('Error saving landmarks:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  }
}