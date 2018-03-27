/**
 * @name router.project
 */

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import ProjectRegister from '@/pages/Project/Register/ProjectRegister.vue';

import ProjectRegisterStep01 from '@/pages/Project/Register/Components/ProjectRegisterStep01.vue';

export const ProjectRouters = [{
	path: '/project/register',
	components: {
		header: Header,
		content: ProjectRegister,
		footer: Footer,
	},
    children: [{
	    path: '',
        name: 'projectRegisterStep01',
        component: ProjectRegisterStep01
    }]
}];
