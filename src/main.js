import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueGoogleCharts from 'vue-google-charts'
//dev only
// import { domain, clientId, audience } from "../auth_config.json";
import { Auth0Plugin } from "./auth";
const domain = process.env.VUE_APP_DOMAIN,
      clientId = process.env.VUE_APP_CLIENT_ID,
      audience = process.env.VUE_APP_AUDIENCE;

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.use(VueGoogleCharts)
Vue.use(require("moment"))

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
