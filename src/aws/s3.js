require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

// uploads a file to s3
function uploadFile(fileBuffer, fileName, mimetype) {
  try {
    console.log(`from uploadFile ${fileName}`);
    const uploadParams = {
      Bucket: bucketName,
      Body: fileBuffer,
      Key: fileName,
      ContentType: mimetype,
    };
    console.log("from uploadFile1");

    return s3.send(new PutObjectCommand(uploadParams)).array;
  } catch (error) {
    console.log(`error from uploadFile s1=${error}`);
  }
}
exports.uploadFile = uploadFile;

// downloads a file from s3

async function getFileStream(imageKey) {
  try {
    console.log(`getFileStream imageKey=${imageKey}`);
    const params = {
      Bucket: bucketName,
      Key: imageKey,
    };

    // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
    const command = new GetObjectCommand(params);
    const seconds = 60;
    const url = await getSignedUrl(s3, command);
    console.log(`url=${url}`);
    return url;
  } catch (error) {
    console.log(`error from getFileStream s1=${error}`);
  }
}
exports.getFileStream = getFileStream;

function deleteFile(fileName) {
  try {
    const deleteParams = {
      Bucket: bucketName,
      Key: fileName,
    };

    return s3.send(new DeleteObjectCommand(deleteParams));
  } catch (error) {
    console.log(`error from deleteFile s1=${error}`);
  }
}
exports.deleteFile = deleteFile;
