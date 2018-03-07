import Vue from 'vue';
import EmailForm from 'components/forms/Email.form';
import { EmailHost } from '@/interfaces/Form.interface';


describe('유저는 EmailForm을 사용해 이메일을 입력할 수 있다', () => {
    it('유저가 이메일을 입력하고 계정 종류를 선택하면 이메일 주소가 완성된다', () => {
        const vm = new EmailForm();
        vm.$mount();
        const emailHost: EmailHost = {
            name: '구글',
            id: 'google',
            host: 'google.com',
            isDirectInput: false,
        };
        vm.email = 'evan';
        vm.onChangeEmailHost(emailHost);
        expect(vm.email).to.equal('evan@google.com');
    });

    it('유저가 이메일을 끝까지 입력하더라도 계정 종류를 선택하면 이메일 호스트가 갱신된다', () => {
        const vm = new EmailForm();
        vm.$mount();
        const emailHost: EmailHost = {
            name: '구글',
            id: 'google',
            host: 'google.com',
            isDirectInput: false,
        };
        vm.email = 'evan@naver.com';
        vm.onChangeEmailHost(emailHost);
        expect(vm.email).to.equal('evan@google.com');
    });

    it('유저가 직접 입력 시 "@"를 입력하게 되면 직접입력으로 전환된다', () => {
        const vm = new EmailForm();
        vm.$mount();
        const dummyEvent = {
            keyCode: 50,
            shiftKey: true,
        };
        vm.onDetectAtKey(dummyEvent);
        expect(vm.selectedEmailHost.id).to.equal('custom');
    });
});
