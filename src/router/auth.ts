/**
 * @name router.auth
 */

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import Signin from '@/pages/Account/Signin.vue';
import Signup from '@/pages/Account/Signup.vue';
import Signdrop from '@/pages/Account/Signdrop.vue';
import AuthSendMail from '@/pages/Account/AuthSendMail.vue';

import AuthGrade from '@/pages/Auth/AuthGrade.vue';
import AuthGradeLanding from '@/pages/Auth/AuthGradeLanding.vue';
import AuthPassword from '@/pages/Auth/AuthPassword.vue';
import AuthPasswordLanding from '@/pages/Auth/AuthPasswordLanding.vue';

export const AuthRouters = [{
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
}];