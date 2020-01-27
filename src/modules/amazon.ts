import aws from 'aws-sdk';
import fs from 'fs';

export default async function uploadFile({
    fileName,
    filePath,
    fileType,
}): Promise<void> {
    return new Promise((resolve, reject) => {
        aws.config.update({
            accessKeyId: 'AKIAIR4PTBARHSSOUIJQ',
            secretAccessKey: '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',
        });

        const stream = fs.createReadStream(filePath);
        stream.on('error', err => {
            reject(err);
        });

        const s3 = new aws.S3();
        s3.upload(
            {
                ACL: 'public-read',
                Bucket: 'dnbazh-test',
                Body: stream,
                Key: fileName,
                ContentType: fileType,
            },
            (err, data) => {
                if (err) {
                    reject(err);
                } else if (data) {
                    resolve(data.Location);
                }
            },
        );
    });
}
