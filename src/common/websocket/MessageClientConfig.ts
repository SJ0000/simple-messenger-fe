export default class MessageClientConfig {
  public url: string;
  constructor(env: any) {
    this.url = env.WS_URL;
  }
}
