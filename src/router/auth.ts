/**
 * @name router.auth
 */

const Header = () => import('@/components/Header.vue');
const Footer = () => import('@/components/Footer.vue');

const Signin = () => import('@/pages/Auth/Signin.vue');
const Signup = () => import('@/pages/Auth/Signup.vue');
const Signdrop = () => import('@/pages/Auth/Signdrop.vue');
const AuthSendMail = () => import('@/pages/Auth/AuthSendMail.vue');

const AuthGrade = () => import('@/pages/Auth/AuthGrade.vue');
const AuthGradeLanding = () => import('@/pages/Auth/AuthGradeLanding.vue');
const AuthPassword = () => import('@/pages/Auth/AuthPassword.vue');
const AuthPasswordLanding = () => import('@/pages/Auth/AuthPasswordLanding.vue');

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
