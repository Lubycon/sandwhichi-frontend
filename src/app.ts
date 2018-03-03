import Vue from 'vue';
import App from './App.vue';
import store from './stores/store';
import router from './router';
import { sync } from 'vuex-router-sync';
import Component from 'vue-class-component';
import { APICore } from '@/api/APICore';
import { GOOGLE_CLIENT_ID } from '@/constants/env.constant';

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate'
]);

// Bootstrap
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
Vue.use(BootstrapVue);

// Validator
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

// Moment
import VueMoment from 'vue-moment';
Vue.use(VueMoment);

import GoogleAuth from '@/plugin/GoogleAuth';
Vue.use(GoogleAuth, {
    clientID: GOOGLE_CLIENT_ID,
});

// only for Client importing
// if (process.browser) {
//
// }

// Service init
APICore.store = store;

export function createApp () {
    sync(store, router);

    const app = new Vue({
        router,
        store,
        render: h => h(App),
    });

    return {
        app,
        router,
        store,
    };
}
