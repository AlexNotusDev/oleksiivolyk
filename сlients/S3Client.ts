import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

class S3ApiClient {
  private readonly bucket: string;
  private readonly s3Client: S3Client;

  constructor() {
    this.bucket = process.env.awsBucketName || '';
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: process.env.awsAccessKey || '',
        secretAccessKey: process.env.awsSecretAccessKey || '',
      },
      region: process.env.awsRegion || '',
    });
  }

  async removeS3Image(key: string): Promise<void> {
    const deleteParams = {
      Bucket: this.bucket,
      Key: key,
    };

    const deleteCommand = new DeleteObjectCommand(deleteParams);

    try {
      await this.s3Client.send(deleteCommand);
    } catch (e) {
      console.log(`ERROR for ${key}`, e);
    }
  }

  async getS3ImageUrl(key: string, expiresIn = 600): Promise<string> {
    const getObjectParams = {
      Bucket: this.bucket,
      Key: key,
    };

    const getCommand = new GetObjectCommand(getObjectParams);
    return getSignedUrl(this.s3Client as any, getCommand as any, { expiresIn });
  }

  async uploadS3Image(key: string, body: any, contentType: string): Promise<void> {
    console.log(
      'aws creds',
      process.env.awsBucketName,
      process.env.awsAccessKey,
      process.env.awsSecretAccessKey,
      process.env.awsRegion,
    );

    const params = {
      Bucket: this.bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    };

    const putCommand = new PutObjectCommand(params as PutObjectCommandInput);
    try {
      await this.s3Client.send(putCommand);
    } catch (e) {
      console.log('ERROR', e);
    }
  }
}

const s3Client = new S3ApiClient();
export default s3Client;
