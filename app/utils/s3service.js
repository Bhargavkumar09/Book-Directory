const { S3 } = require("aws-sdk");
const uuid = require("uuid").v4;

const { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME } =
  process.env;
exports.s3storage = async (folder, file) => {
  console.log(file);
  const s3 = new S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  });
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: `uploads/${folder}/${uuid()}`,
    Body: file.buffer,
  };
  //   console.log(params);
  return await s3.upload(params).promise();
};