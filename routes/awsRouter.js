import express from "express";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const awsRouter = express.Router();

const s3Client = new S3Client({ region: process.env.AWS_REGION });

// Set parameters
// Create a random name for the Amazon Simple Storage Service (Amazon S3) bucket and key

awsRouter.get('/', async(req, res) => {
    console.log("check req---", req.query.filename);
    const bucketParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.query.filename,
        Body: "BODY"
      };
    
      try {
        const command = new PutObjectCommand(bucketParams);
        // create preSigned Url
        const signedUrl = await getSignedUrl(s3Client, command, {expiresIn: 3600});
        res.send(signedUrl)

      } catch (error) {
          console.log(error);
      }
   
})

export default awsRouter;