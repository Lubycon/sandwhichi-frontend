/**
 * @name router.home
 */

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import Home from '@/pages/Home.vue';
import ErrorView from '@/pages/ErrorView.vue';

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