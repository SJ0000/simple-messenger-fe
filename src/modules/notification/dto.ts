export class NotificationTokenDto{
  fcmToken: string;

  constructor(fcmToken: string) {
    this.fcmToken = fcmToken;
  }
}
