import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { ObjectStorageConfig } from "./config";

// TODO : Policy 부분 정독후 적용 후 테스트

export class ObjectStorageClient {
  private static instance: ObjectStorageClient;

  private s3Client: S3Client;
  private bucketName: string;

  private constructor(config: ObjectStorageConfig) {
    process.env.OBJECT_STORAGE_REGION;
    this.s3Client = new S3Client({
      region: config.region,
      endpoint: config.endpoint,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      forcePathStyle: true,
    });
    this.bucketName = config.bucketName;
  }

  public static initialize(config: ObjectStorageConfig) {
    this.instance = new ObjectStorageClient(config);
  }

  public static getInstance(): ObjectStorageClient {
    if (this.instance === null || this.instance === undefined)
      throw Error("ObjectStorageClient not initialized");

    return this.instance;
  }

  async saveUseS3Client(name: string, content: string) {
    console.log("saveUseS3Client called");

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: name,
      Body: content,
    });
    try {
      const result = await this.s3Client.send(command);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }
}
