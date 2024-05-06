export class ObjectStorageConfig {
  public region: string;
  public endpoint: string;
  public accessKeyId: string;
  public secretAccessKey: string;
  public bucketName: string;

  constructor(env: any) {
    this.region = env.OBJECT_STORAGE_REGION;
    this.endpoint = env.OBJECT_STORAGE_ENDPOINT;
    this.accessKeyId = env.OBJECT_STORAGE_KEY_ID;
    this.secretAccessKey = env.OBJECT_STORAGE_KEY_SECRET;
    this.bucketName = env.OBJECT_STORAGE_BUCKET_NAME;
  }
}

export class MessageClientConfig {
  public url: string;
  constructor(env: any) {
    this.url = env.WS_URL;
  }
}
