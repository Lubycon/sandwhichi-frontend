/**
 * @name router.project
 */

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import CreateProject from '@/pages/Project/CreateProject.vue';

export const ProjectRouters = [{
	path: '/project/create',
	components: {
		header: Header,
		content: CreateProject,
		footer: Footer,
	},
}];
