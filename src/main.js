import { createApp } from 'vue'
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import Notifications from "notiwind";
import messages from "@intlify/vite-plugin-vue-i18n/messages";


import App from "@/App.vue";
import router from "@/router";

import "./assets/main.scss";

const piniaLogger = ({ store }) => {
  store.$subscribe((mutation, _) => {
    const mut = `{ "store": ${mutation.storeId}, "type": ${mutation.type}, "payload": ${mutation.payload} }`;
    console.log(JSON.parse(JSON.stringify(mut)));
  });
  store.$onAction(action => {
    const act = `{ "store": ${action.store.$id}, "action": ${action.name}, "payload": ${action.args} }`;
    console.log(JSON.parse(JSON.stringify(act)));
  });
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages,
});

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaLogger);
// Adding Router to store for easy routing
pinia.use(({ store }) => {
  // store.router = markRaw(router);
});

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(Notifications);

router.isReady().then(() => app.mount("#app"));
