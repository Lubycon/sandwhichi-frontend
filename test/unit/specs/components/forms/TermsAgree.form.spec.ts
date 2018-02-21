import Vue from 'vue';
import TermsAgreeForm from 'components/forms/TermsAgree.form';


describe('유저는 TermsAgreeForm을 사용해 이용약관에 동의할 수 있다', () => {
    it('유저가 전체 동의를 선택하면 모든 체크박스가 체크된다', () => {
        const vm = new TermsAgreeForm();
        vm.$mount();
        vm.onChangeCheckAll(true);
        
        const result = vm.isCheckedPrivacyPolicy &&
            vm.isCheckedTerms &&
            vm.isCheckedSendEmail;
        expect(result).to.be.true;
    });
});
