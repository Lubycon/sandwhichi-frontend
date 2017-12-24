declare var __dirname;

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';

/* Global Components */
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
/* /Global Components */

/* PAGES */
import Home from '@/pages/Home.vue';
import ErrorView from '@/pages/ErrorView.vue';

import Signin from '@/pages/Account/Signin.vue';
import Signup from '@/pages/Account/Signup.vue';
import Signdrop from '@/pages/Account/Signdrop/Signdrop.vue';
import AuthSendMail from '@/pages/Account/AuthSendMail.vue';

import AuthGrade from '@/pages/Auth/AuthGrade.vue';
import AuthGradeLanding from '@/pages/Auth/AuthGradeLanding.vue';
import AuthPassword from '@/pages/Auth/AuthPassword.vue';
import AuthPasswordLanding from '@/pages/Auth/AuthPasswordLanding.vue';

import Docs from '@/pages/Docs/Docs.vue';
import PrivacyPolicy from '@/pages/Docs/PrivacyPolicy/PrivacyPolicy.vue';
import TermsOfService from '@/pages/Docs/TermsOfService/TermsOfService.vue';
/* /PAGES */

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
    routes: [{
        path: '/',
        name: 'home',
        components: {
            header: Header,
            content: Home,
            footer: Footer,
        },
    }, {
        path: '/error/:code',
        name: 'error-view',
        components: {
            header: Header,
            content: ErrorView,
            footer: Footer,
        },
        props: {
            content: true,
        },
    }, {
        path: '/signin',
        name: 'signin',
        components: {
            content: Signin,
        },
    }, {
        path: '/signup',
        name: 'signup',
        components: {
            content: Signup,
        },
    }, {
        path: '/signdrop',
        name: 'signdrop',
        components: {
            header: Header,
            content: Signdrop,
            footer: Footer,
        },
    }, {
        path: '/find-password',
        name: 'find-password',
        components: {
            header: Header,
            content: AuthSendMail,
            footer: Footer,
        },
    }, {
        path: '/auth/grade',
        name: 'auth-grade',
        components: {
            header: Header,
            content: AuthGrade,
            footer: Footer,
        },
    }, {
        path: '/auth/grade/landing/:code',
        name: 'auth-grade-landing',
        components: {
            header: Header,
            content: AuthGradeLanding,
            footer: Footer,
        },
        props: {
            content: true,
        },
    }, {
        path: '/auth/password',
        name: 'auth-password',
        components: {
            header: Header,
            content: AuthPassword,
            footer: Footer,
        },
    }, {
        path: '/auth/password/landing/:code',
        name: 'auth-password-landing',
        components: {
            header: Header,
            content: AuthPasswordLanding,
            footer: Footer,
        },
        props: {
            content: true,
        },
    }, {
        path: '/docs',
        name: 'docs',
        components: {
            header: Header,
            content: Docs,
            footer: Footer,
        },
        children: [{
            path: 'privacypolicy',
            name: 'privacy-policy',
            component: PrivacyPolicy,
        }, {
            path: 'termsofservice',
            name: 'terms-of-service',
            component: TermsOfService,
        }],
    }],
});

export default router;
