export class ObjectStorageConfig {
  public region: string;
  public endpoint: string;
  public accessKeyId: string;
  public secretAccessKey: string;
  public bucketName: string;
  public publicUrlPrefix: string;

  constructor(env: any) {
    this.region = env.OBJECT_STORAGE_REGION;
    this.endpoint = env.OBJECT_STORAGE_ENDPOINT;
    this.accessKeyId = env.OBJECT_STORAGE_KEY_ID;
    this.secretAccessKey = env.OBJECT_STORAGE_KEY_SECRET;
    this.bucketName = env.OBJECT_STORAGE_BUCKET_NAME;
    this.publicUrlPrefix = env.OBJECT_STORAGE_PUBLIC_URL_PREFIX;
  }
}

export class MessageClientConfig {
  public url: string;
  constructor(env: any) {
    this.url = env.WS_URL;
  }
}

export class FirebaseConfig{
  public apiKey : string;
  public authDomain : string;
  public projectId : string;
  public storageBucket : string;
  public messagingSenderId : string;
  public appId : string;
  public measurementId : string;

  constructor(env: any) {
    this.apiKey = env.FIREBASE_API_KEY
    this.authDomain = env.FIREBASE_AUTH_DOMAIN
    this.projectId = env.FIREBASE_PROJECT_ID
    this.storageBucket = env.FIREBASE_STORAGE_BUCKET
    this.messagingSenderId = env.FIREBASE_MESSAGING_SENDER_ID
    this.appId = env.FIREBASE_APP_ID
    this.measurementId = env.FIREBASE_MEASUREMENT_ID
  }
}
