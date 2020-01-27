const aws = require('aws-sdk');
const fs = require('fs');

exports.uploadFile = async ({fileName, filePath, fileType}) => {
  return new Promise((resolve, reject) => {
    aws.config.update({
      accessKeyId: "AKIAIR4PTBARHSSOUIJQ",
      secretAccessKey: "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",
    });

    const stream = fs.createReadStream(filePath);
    stream.on("error", function(err) {
      reject(err);
		});
		
		let s3 = new aws.S3();
    s3.upload(
      {
        ACL: "public-read",
        Bucket: "dnbazh-test",
        Body: stream,
        Key: fileName,
        ContentType: fileType,
      },
      function(err, data) {
        if (err) {
          reject(err);
        } else if (data) {
          resolve(data.Location);
        }
      }
    );
  });
};