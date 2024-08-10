import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {ObjectStorageConfig} from "./Configurations";
import User from "@/domain/user/User";

export class ObjectStorageClient {
  private static instance: ObjectStorageClient;

  private s3Client: S3Client;
  private bucketName: string;
  private publicUrlPrefix: string;

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
    this.publicUrlPrefix = config.publicUrlPrefix;
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

  async saveProfileImage(user: User, image: File): Promise<string> {
    const ext = image.name.split(".").pop();
    const savePath = `profile-images/${user.id}.${ext}`;
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: savePath,
      Body: image,
      ContentType: `image/${ext}`,
    });

    try {
      const result = await this.s3Client.send(command);
    } catch (err) {
      console.error(err);
    }

    return `${this.publicUrlPrefix}/${savePath}`;
  }
}
