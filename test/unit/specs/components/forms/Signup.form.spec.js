import Vue from 'vue';
import SignupForm from 'components/forms/Signup.form';

/**
 * @function describe
 * @desc Signup.form 유닛 테스트
 */
describe('Signup.form.vue', () => {
    it('Check msg on Footer component', () => {
        const vm = new Vue(SignupForm).$mount();

        expect(vm.msg).to.contain('This is Global Footer');
    });
});
