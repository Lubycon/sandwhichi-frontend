/**
 * @name router.home
 */

const Header = () => import('@/components/Header.vue');
const Footer = () => import('@/components/Footer.vue');

const Home = () => import('@/pages/Home.vue');
const ErrorView = () => import('@/pages/ErrorView.vue');

export const HomeRouters = [{
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
}];
