declare var __dirname;

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';

/* ROUTERS */
import { HomeRouters } from '@/router/home';
import { AuthRouters } from '@/router/auth';
import { DocsRouters } from '@/router/docs';
/* /ROUTERS */

Vue.use(VueRouter);
Vue.use(VueMeta, {
    attribute: 'data-vue-meta',
    ssrAttribute: 'data-vue-meta-server-rendered',
});

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        else return { x: 0, y: 0 };
    },
    routes: [
        ...HomeRouters,
        ...AuthRouters,
        ...DocsRouters
    ],
});

export default router;
