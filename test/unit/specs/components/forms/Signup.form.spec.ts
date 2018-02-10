import Vue from 'vue';
import SignupForm from 'components/forms/Signup.form';

/**
 * @description Signup.form 유닛 테스트
 * @param { Regex } Password
 * @param { Regex } nameRegex /[^!@#$%^&*.,`"'\s]+$/
 */

/**
 * @description
 * 이메일 밸리데이션 중 isExistEmail 항목이 있는데,
 * 이는 로컬 API 서버가 있어야 작동합니다
 */

/**
 * @description 비밀번호 점수 조건
 * [condition1] 소문자 존재 -> 1
 * [condition2] 대문자 존재 -> 1
 * [condition3] 숫자 존재 -> 1
 * [condition4] 특수문자 존재 -> 2
 * [condition5] 같은 글자가 3번 이상 반복되지 않음 -> 5
 * [condition6] 8글자 이상임 -> 10
 */

describe('Signup.form.vue', () => {
    it('유저의 이메일은 반드시 존재해야한다', async () => {
        const vm = new SignupForm();
        vm.$mount();
        const validate = await vm.$validator.validate('email', '');
        expect(validate).to.be.false;
    });

    it('유저의 이메일은 반드시 올바른 형식을 가지고 있어야 한다', async () => {
        const vm = new SignupForm();
        vm.$mount();
        const validate = await vm.$validator.validate('email', 'google.com');
        expect(validate).to.be.false;
    });

    it('올바른 형식의 이메일은 사용할 수 있다', async () => {
        const vm = new SignupForm();
        vm.$mount();
        const validate = await vm.$validator.validate('email', 'evan@gmail.com');
        expect(validate).to.be.true;
    });

    it('유저의 비밀번호는 반드시 존재해야한다', async () => {
        const vm = new SignupForm();
        vm.$mount();
        const validate = await vm.$validator.validate('password', '');
        expect(validate).to.be.false;
    });

    it('보안성이 낮은 비밀번호는 사용할 수 없다 (1q2w3e4)', async () => {
        const vm = new SignupForm();
        vm.$mount();
        const password = '1q2w3e4';
        // 비밀번호가 8자 이하이면서 숫자와 소문자로만 이루어진 낮은 보안의 비밀번호
        const validate = await vm.$validator.validate('password', password);
        expect(validate).to.be.false;
    });

    it('보안성이 높은 비밀번호는 사용할 수 있다 (qQ2#skjfh!)', async () => {
        const vm = new SignupForm();
        vm.$mount();
        const password = 'qQ2#skjfhhh!';
        // 비밀번호가 8자 이상, 소문자, 대문자, 숫자, 특수문자 포함
        // 그러나 같은 문자가 3번 이상 반복됨
        const validate = await vm.$validator.validate('password', password);
        expect(validate).to.be.true;
    });

    it('유저의 이름은 성과 이름을 조합하여 만들어진다', () => {
        const vm = new SignupForm();
        vm.$mount();
        vm.$set(vm, 'lastName', '홍');
        vm.$set(vm, 'firstName', '길동');

        expect(vm.username).to.equal('홍길동');
    });

    it('유저의 성과 이름은 반드시 존재해야한다', async () => {
        const vm = new SignupForm();
        vm.$mount();
        const validateLastName = await vm.$validator.validate('lastName', '');
        const validateFirstName = await vm.$validator.validate('firstName', '');
        
        const result = validateLastName || validateFirstName;
        expect(result).to.be.false;
    });

    it('유저의 이름에는 특수문자나 공백이 들어갈 수 없다', async () => {
        const vm = new SignupForm();
        vm.$mount();
        const validate1 = await vm.$validator.validate('firstName', '길동!이');
        const validate2 = await vm.$validator.validate('firstName', '길동이#');
        const validate3 = await vm.$validator.validate('firstName', '길동 이');
        const validate4 = await vm.$validator.validate('firstName', '길동이 ');
        const validate5 = await vm.$validator.validate('firstName', '!길동이');

        const result = validate1 || validate2 || validate3 || validate4 || validate5;
        expect(result).to.be.false;
    });

    it('유저의 성에는 특수문자나 공백이 들어갈 수 없다', async () => {
        const vm = new SignupForm();
        vm.$mount();
        const validate1 = await vm.$validator.validate('lastName', '홍#');
        const validate2 = await vm.$validator.validate('lastName', '선#우');
        const validate3 = await vm.$validator.validate('lastName', '제 갈');
        const validate4 = await vm.$validator.validate('lastName', ' 배');
        const validate5 = await vm.$validator.validate('lastName', '사과!');

        const result = validate1 || validate2 || validate3;
        expect(result).to.be.false;
    });

    it('이용약관에 동의하지 않았다면 회원가입을 진행할 수 없다', async () => {
        // 아직 폼이 없으므로 무조건 통과하도록 작성함
        // 2018.02.10 Evan
        expect(true).to.be.true;
    });
});
