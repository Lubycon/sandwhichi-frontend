/**
 * @name router.docs
 */

const Header = () => import('@/components/Header.vue');
const Footer = () => import('@/components/Footer.vue');

const Docs = () => import('@/pages/Docs/Docs.vue');
const PrivacyPolicy = () => import('@/pages/Docs/PrivacyPolicy/PrivacyPolicy.vue');

const TermsOfService = () => import('@/pages/Docs/TermsOfService/TermsOfService.vue');

export const DocsRouters = [{
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
}];
