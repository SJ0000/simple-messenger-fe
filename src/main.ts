import {registerPlugins} from "@/plugins";
import App from "./App.vue";
import {createApp} from "vue";
import {ObjectStorageClient} from "@/common/api/ObjectStorageClient";
import {MessageClientConfig, ObjectStorageConfig} from "@/common/api/Configurations";
import {MessageClient} from "@/common/api/MessageClient";


const app = createApp(App);
registerPlugins(app);
app.mount("#app");

// initialize
ObjectStorageClient.initialize(new ObjectStorageConfig(process.env));
MessageClient.initialize(new MessageClientConfig(process.env));
