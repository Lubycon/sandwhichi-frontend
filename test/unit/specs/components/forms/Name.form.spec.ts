import Vue from 'vue';
import NameForm from 'components/forms/Name.form';


describe('유저는 Nameform을 사용해 이름을 입력할 수 있다', () => {
    it('유저의 이름은 성과 이름을 조합하여 만들어진다', () => {
        const vm = new NameForm();
        vm.$mount();
        vm.$set(vm, 'lastName', '홍');
        vm.$set(vm, 'firstName', '길동');

        expect(vm.username).to.equal('홍길동');
    });
});
