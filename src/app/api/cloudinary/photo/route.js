import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const publicId = searchParams.get('id');

    if (!publicId) {
      return NextResponse.json({ error: 'Missing "id" query parameter.' }, { status: 400 });
    }

    const resource = await cloudinary.api.resource(publicId);
    return NextResponse.json({ resource });
  } catch (error) {
    console.error('Cloudinary resource fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch resource.' },
      { status: 500 }
    );
  }
}
