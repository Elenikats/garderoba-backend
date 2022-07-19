import dotenv from "dotenv"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const bucketParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: "test.txt",
    Body: "BODY"   //the blob file goes in here?
  };
const s3Client = new S3Client({ region: process.env.AWS_REGION });
try {
    // Create a command to put the object in the S3 bucket.

    const command = new PutObjectCommand(bucketParams);
    // Create the presigned URL.
    console.log("command--", command);
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    console.log(
      `\nPutting "${bucketParams.Key}" using signedUrl with body "${bucketParams.Body}" in v3`
    );
    console.log("signedUrl---", signedUrl);
    
    const response = await fetch(signedUrl, {method: 'PUT', body: bucketParams.Body});
    console.log(
      `\nResponse returned by signed URL: ${await response.json()}\n`
    );
  } catch (err) {
    console.log("Error creating presigned URL", err);
  }