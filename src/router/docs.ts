/**
 * @name router.docs
 */

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import Docs from '@/pages/Docs/Docs.vue';
import PrivacyPolicy from '@/pages/Docs/PrivacyPolicy/PrivacyPolicy.vue';
import TermsOfService from '@/pages/Docs/TermsOfService/TermsOfService.vue';

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