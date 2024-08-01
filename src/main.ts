import {registerPlugins} from "@/plugins";
import App from "./App.vue";
import {createApp} from "vue";
import {ObjectStorageClient} from "./modules/api/ObjectStorageClient";
import {MessageClientConfig, ObjectStorageConfig} from "./modules/api/Configurations";
import {MessageClient} from "./modules/api/MessageClient";
import { initializeApp } from "firebase/app";
import {getMessaging, getToken, onMessage} from "firebase/messaging";
import {FirebaseConfig, publicVapidKey} from "@/modules/notification/Configurations";

const app = createApp(App);
registerPlugins(app);
app.mount("#app");

// initialize
ObjectStorageClient.initialize(new ObjectStorageConfig(process.env));
MessageClient.initialize(new MessageClientConfig(process.env));

const firebaseApp = initializeApp(new FirebaseConfig());

const messaging = getMessaging(firebaseApp)

onMessage(messaging, (payload) => {
  console.log(`message received = ${payload}`)
})

getToken(messaging, {
  vapidKey: publicVapidKey
}).then((currentToken) => {
  console.log(currentToken)
})
