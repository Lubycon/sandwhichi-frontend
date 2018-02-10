// require all test files (files that ends with .spec.js)
import 'babel-polyfill';

import Vue from 'vue';
import store from 'stores/store';
import { sync } from 'vuex-router-sync';
import Component from 'vue-class-component';
import { APICore } from '@/api/APICore';

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

// Service init
APICore.store = store;

// Mockup Components
Vue.component('router-link', { // registers router-link component
    template: `<div />`
});

declare var require;
declare var module;

var testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);
module.export = testsContext;
