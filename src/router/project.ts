/**
 * @name router.project
 */

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import ProjectRegister from '@/pages/Project/Register/ProjectRegister.vue';

import ProjectRegisterDefault from '@/pages/Project/Register/Components/ProjectRegister.default.vue';
import ProjectRegisterSchedule from '@/pages/Project/Register/Components/ProjectRegister.schedule.vue';
import ProjectRegisterRegion from '@/pages/Project/Register/Components/ProjectRegister.region.vue';

export const ProjectRouters = [{
	path: '/project/register',
	components: {
		header: Header,
		content: ProjectRegister,
		footer: Footer,
	},
    children: [{
	    path: '',
        name: 'ProjectRegisterDefault',
        component: ProjectRegisterDefault
    }, {
        path: 'schedule',
        name: 'ProjectRegisterSchedule',
        component: ProjectRegisterSchedule
    }, {
        path: 'region',
        name: 'ProjectRegisterRegion',
        component: ProjectRegisterRegion
    }]
}];
