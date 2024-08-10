import {getMessaging, getToken, onMessage} from "firebase/messaging";
import {Messaging} from "@firebase/messaging";
import {FirebaseConfig, publicVapidKey} from "@/domain/notification/Configurations";
import {initializeApp} from "firebase/app";

export class NotificationService {
  private static instance: NotificationService;

  private messaging: Messaging | undefined;

  private constructor() {
    this.initialize()
  }

  public static getInstance(): NotificationService {
    if (this.instance === null || this.instance === undefined)
      this.instance = new NotificationService()
    return this.instance;
  }

  private initialize(){
    const firebaseApp = initializeApp(new FirebaseConfig());
    this.messaging = getMessaging(firebaseApp)

    if (Notification.permission !== "granted")
      return;

    onMessage(this.messaging, (payload) => {
      console.log(`[foreground] Received message = ${payload}`)
      const title = payload.notification?.title ?? ""
      new Notification(title, {
        body: `[foreground] ${payload.notification?.body}`,
        icon: "/favicon.ico"
      });
    })
  }

  public async createFcmToken() : Promise<string>{
    if(this.messaging === undefined)
      throw Error("messaging is undefined")

    return getToken(this.messaging, {
      vapidKey: publicVapidKey
    })
  }
}
