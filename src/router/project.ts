/**
 * @name router.project
 */

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import ProjectRegister from '@/pages/Project/Register/ProjectRegister.vue';

import ProjectRegisterDefault from '@/pages/Project/Register/Components/ProjectRegister.default.vue';
import ProjectRegisterSchedule from '@/pages/Project/Register/Components/ProjectRegister.schedule.vue';

export const ProjectRouters = [{
	path: '/project/register',
	components: {
		header: Header,
		content: ProjectRegister,
		footer: Footer,
	},
    children: [{
	    path: 'step01',
        name: 'ProjectRegisterDefault',
        component: ProjectRegisterDefault
    }, {
        path: 'step02',
        name: 'ProjectRegisterSchedule',
        component: ProjectRegisterSchedule
    }]
}];
