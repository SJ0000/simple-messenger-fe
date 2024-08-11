import {registerPlugins} from "@/plugins";
import App from "./App.vue";
import {createApp} from "vue";
import ObjectStorageClient from "@/common/object-storage/ObjectStorageClient";
import MessageClient from "@/common/websocket/MessageClient";
import ObjectStorageConfig from "@/common/object-storage/ObjectStorageConfig";
import MessageClientConfig from "@/common/websocket/MessageClientConfig";


const app = createApp(App);
registerPlugins(app);
app.mount("#app");

// initialize
ObjectStorageClient.initialize(new ObjectStorageConfig(process.env));
MessageClient.initialize(new MessageClientConfig(process.env));
