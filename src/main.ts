import { registerPlugins } from "@/plugins";
import App from "./App.vue";
import { createApp } from "vue";
import { ObjectStorageClient } from "./modules/api/object-storage";
import { MessageClientConfig, ObjectStorageConfig } from "./modules/api/config";
import { MessageClient } from "./modules/api/message-client";

const app = createApp(App);
registerPlugins(app);
app.mount("#app");

// initialize
ObjectStorageClient.initialize(new ObjectStorageConfig(process.env));
MessageClient.initialize(new MessageClientConfig(process.env));
