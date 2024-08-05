// Import the AWS SDK module
import AWS from 'aws-sdk'

// Asynchronous function to upload a file to S3
export async function uploadToS3(file: File) {
    try {
        // Configure AWS credentials
        AWS.config.update({
            // AWS access key
            accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
            // AWS secret key
            secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
        });

        // Create an S3 instance with necessary parameters
        const s3 = new AWS.S3({
            params: {
                // S3 bucket name
                Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            },
            // AWS region
            region: 'eu-west-3'
        });

        // Generate a unique identifier for the file
        const file_key = 'uploads/' + Date.now().toString() + file.name.replace(' ', '-');

        // Parameters for the putObject operation
        const params = {
            // S3 bucket name
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            // Unique key for the file
            Key: file_key,
            // File content
            Body: file
        };

        // Upload the file to S3
        const upload = s3.putObject(params).on('httpUploadProgress',
            evt => {
                console.log('Uploading to s3...', parseInt(((evt.loaded * 100) / evt.total).toString()) + "%");
            }).promise();

        // Await the completion of the upload and handle the promise
        await upload.then(data => {
            console.log('Successfully uploaded to S3!', file_key);
        });

        // Resolve the promise with file information
        return Promise.resolve({
            file_key,
            file_name: file.name
        });
    } catch (e) {
        // Handle errors here (optional, not implemented)
        console.error("Error uploading to S3:", e);
    }
}

// Function to get the URL of a file in S3
export function getS3Url(file_key: string) {
    const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.eu-west-3.amazonaws.com/${file_key}`;
    return url;
}
