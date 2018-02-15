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

    it('올바르지 않은 형식의 이메일은 사용할 수 없다', async () => {
        const vm = new SigninForm();
        vm.$mount();
        const validate = await vm.$validator.validate('email', 'google.com');
        expect(validate).to.be.false;
    });

    it('올바른 형식의 이메일은 사용할 수 있다', async () => {
        const vm = new SigninForm();
        vm.$mount();
        const validate = await vm.$validator.validate('email', 'bboydart91@gmail.com');
        expect(validate).to.be.true;
    });

    it('유저의 비밀번호는 반드시 존재해야한다', async () => {
        const vm = new SigninForm();
        vm.$mount();
        const validate = await vm.$validator.validate('password', '');
        expect(validate).to.be.false;
    });

    it('비밀번호를 6회 이상 틀리면 메세지가 변경되어야 한다', async () => {
        const vm = new SigninForm();
        vm.$mount();
        vm.$set(vm, 'email', 'bboydart91@gmail.com');
        vm.$set(vm, 'password', '1234');
        // 강제로 변수를 변경해서 ReCaptcha가 켜지는 것을 방지
        vm.isEnableReCaptcha = true;

        // 유저가 비밀번호를 틀렸다.
        await vm.addInvalidCount(1);
        vm.setPasswordErrorWithSignin(true);
        const prevMsg = vm.errors.first('password');

        // 5회 더 틀렸다고 가정
        await vm.addInvalidCount(5);
        // 메시지를 바인딩하기 전 error.password 배열을 초기화 해준다
        vm.errors.remove('password');
        vm.setPasswordErrorWithSignin(true);
        const currentMsg = vm.errors.first('password');

        expect(prevMsg).to.not.equal(currentMsg);
    });

    it('비밀번호를 5회 이상 틀리면 ReCaptcha가 켜진다', async () => {
        const vm = new SigninForm();
        vm.$mount();
        vm.$set(vm, 'email', 'bboydart91@gmail.com');
        vm.$set(vm, 'password', '1234');

        await vm.addInvalidCount(5);
        expect(vm.isEnableReCaptcha).to.be.true;
    });
});