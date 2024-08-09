// Plugins
import Components from "unplugin-vue-components/vite";
import Vue from "@vitejs/plugin-vue";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import ViteFonts from "unplugin-fonts/vite";
import Layouts from "vite-plugin-vue-layouts";
import VueRouter from "unplugin-vue-router/vite";

// Utilities
import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      VueRouter({
        routesFolder : {
          src: 'src/views/pages'
        }
      }),
      Layouts({
        layoutsDirs: "src/views/layouts",
      }),
      Vue({
        template: { transformAssetUrls },
      }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
      Vuetify({
        autoImport: true,
        styles: {
          configFile: "src/styles/settings.scss",
        },
      }),
      Components(),
      ViteFonts({
        google: {
          families: [
            {
              name: "Roboto",
              styles: "wght@100;300;400;500;700;900",
            },
          ],
        },
      }),
    ],
    define: {
      "process.env": {
        WS_URL: env.WS_URL,

        OBJECT_STORAGE_REGION: env.OBJECT_STORAGE_REGION,
        OBJECT_STORAGE_ENDPOINT: env.OBJECT_STORAGE_ENDPOINT,
        OBJECT_STORAGE_KEY_ID: env.OBJECT_STORAGE_KEY_ID,
        OBJECT_STORAGE_KEY_SECRET: env.OBJECT_STORAGE_KEY_SECRET,
        OBJECT_STORAGE_BUCKET_NAME: env.OBJECT_STORAGE_BUCKET_NAME,
        OBJECT_STORAGE_PUBLIC_URL_PREFIX: env.OBJECT_STORAGE_PUBLIC_URL_PREFIX,
      },
      global: {},
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: env.API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
