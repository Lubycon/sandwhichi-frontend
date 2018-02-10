import Vue from 'vue';
import SigninForm from 'components/forms/Signin.form';

/**
 * @description Signup.form 유닛 테스트
 */

describe('유저는 SigninForm을 사용해 로그인을 진행한다', () => {
    it('유저의 이메일은 반드시 존재해야한다', async () => {
        const vm = new SigninForm();
        vm.$mount();
        const validate = await vm.$validator.validate('email', '');
        expect(validate).to.be.false;
    });

    it('유저의 이메일은 올바른 형식을 가지고 있어야 한다', async () => {
        const vm = new SigninForm();
        vm.$mount();
        const validate = await vm.$validator.validate('email', 'google.com');
        expect(validate).to.be.false;
    });

    it('올바른 형식의 이메일은 사용할 수 있다', async () => {
        const vm = new SigninForm();
        vm.$mount();
        const validate = await vm.$validator.validate('email', 'evan@gmail.com');
        expect(validate).to.be.true;
    });

    it('유저의 비밀번호는 반드시 존재해야한다', async () => {
        const vm = new SigninForm();
        vm.$mount();
        const validate = await vm.$validator.validate('password', '');
        expect(validate).to.be.false;
    });
});