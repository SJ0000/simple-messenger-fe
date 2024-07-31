import {registerPlugins} from "@/plugins";
import App from "./App.vue";
import {createApp} from "vue";
import {ObjectStorageClient} from "./modules/api/ObjectStorageClient";
import {FirebaseConfig, MessageClientConfig, ObjectStorageConfig} from "./modules/api/Configurations";
import {MessageClient} from "./modules/api/MessageClient";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const app = createApp(App);
registerPlugins(app);
app.mount("#app");

// initialize
ObjectStorageClient.initialize(new ObjectStorageConfig(process.env));
MessageClient.initialize(new MessageClientConfig(process.env));
initializeApp(new FirebaseConfig(process.env));
