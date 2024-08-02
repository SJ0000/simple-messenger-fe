import {getMessaging, getToken, onMessage} from "firebase/messaging";
import {Messaging} from "@firebase/messaging";
import {publicVapidKey} from "@/modules/notification/Configurations";

export function initializeNotification(messaging: Messaging) {
  if (Notification.permission !== "granted")
    return;

  onMessage(messaging, (payload) => {
    console.log(`[foreground] Received message = ${payload}`)

    const title = payload.notification?.title ?? ""
    new Notification(title, {
      body: `[foregorund] ${payload.notification?.body}`,
      icon: "/favicon.ico"
    });

  })

  getToken(messaging, {
    vapidKey: publicVapidKey
  }).then((currentToken) => {
    // TODO : send token to server
    console.log(currentToken)
  })
}
