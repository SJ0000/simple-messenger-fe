import {registerPlugins} from "@/plugins";
import App from "./App.vue";
import {createApp} from "vue";
import {ObjectStorageClient} from "./modules/api/ObjectStorageClient";
import {MessageClientConfig, ObjectStorageConfig} from "./modules/api/Configurations";
import {MessageClient} from "./modules/api/MessageClient";
import {initializeApp} from "firebase/app";

import {FirebaseConfig} from "@/modules/notification/Configurations";
import {initializeNotification} from "@/modules/notification/NotificationService";
import {getMessaging} from "firebase/messaging";


const app = createApp(App);
registerPlugins(app);
app.mount("#app");

// initialize
ObjectStorageClient.initialize(new ObjectStorageConfig(process.env));
MessageClient.initialize(new MessageClientConfig(process.env));

const firebaseApp = initializeApp(new FirebaseConfig());
const messaging = getMessaging(firebaseApp)
initializeNotification(messaging)
