import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary using upload_stream
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'events' },
        (error, uploadResult) => {
          if (error) {
            reject(error);
          } else {
            resolve(uploadResult);
          }
        }
      ).end(buffer);
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload image.' },
      { status: 500 }
    );
  }
}
