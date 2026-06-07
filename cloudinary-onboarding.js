const cloudinary = require('cloudinary').v2;

// 1. Configure Cloudinary (inline credentials as required)
cloudinary.config({
  cloud_name: 'dazoduog2',
  api_key: '293776176747512',
  api_secret: 'rnTK-P1GhlblwWm3I7aaKXUfVk4',
  secure: true
});

async function main() {
  try {
    const sampleImageUrl = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';
    console.log('Uploading sample image to Cloudinary...');

    // 2. Upload an image
    const uploadResult = await cloudinary.uploader.upload(sampleImageUrl, {
      folder: 'onboarding'
    });

    console.log('\n--- Upload Success ---');
    console.log('Secure URL:', uploadResult.secure_url);
    console.log('Public ID:', uploadResult.public_id);

    // 3. Get image details (fetch metadata using the API)
    console.log('\nFetching image details from Cloudinary API...');
    const details = await cloudinary.api.resource(uploadResult.public_id);
    
    console.log('\n--- Image Metadata ---');
    console.log('Width:', details.width, 'px');
    console.log('Height:', details.height, 'px');
    console.log('Format:', details.format);
    console.log('File Size:', details.bytes, 'bytes');

    // 4. Transform the image
    // f_auto: Automatically delivers the image in the most optimal format based on the user's browser (e.g. WebP or AVIF)
    // q_auto: Automatically optimizes the quality level to minimize file size while maintaining visual quality
    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: 'auto',
      quality: 'auto',
      secure: true
    });

    console.log('\n--- Success ---');
    console.log('Done! Click link below to see optimized version of the image. Check the size and the format.');
    console.log('Transformed URL:', transformedUrl);

  } catch (error) {
    console.error('Error during onboarding execution:', error);
  }
}

main();
