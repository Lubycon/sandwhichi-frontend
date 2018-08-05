<template>
<div class="account-form">
    <b-form @submit.prevent="submit" autocomplete="off" novalidate>
        <b-row>
            <email-form
                class="col-12"
                v-model="signupData.email"
                ref="emailForm"
                v-validate="'required|email|avoidExistEmail'"
                data-vv-name="email"
                data-vv-delay="500"
                :state="!errors.has('email')"
                :feedback-msg="errors.first('email')">
            </email-form>
            <b-col cols="12">
                <b-form-group label="비밀번호">
                    <b-form-input
                        type="password"
                        name="password"
                        placeholder="비밀번호 입력"
                        v-model.trim="signupData.password"
                        v-validate="'required|passwordSecurity'"
                        :class="getPasswordLevel(signupData.password)"
                        :state="!errors.has('password')"/>
                    <b-form-text class="has-score">{{ passwordLevelText }}</b-form-text>
                    <b-form-invalid-feedback>{{ errors.first('password') }}</b-form-invalid-feedback>
                </b-form-group>
            </b-col>
            <b-col cols="12">
                <b-form-group label="비밀번호 재확인">
                    <b-form-input
                        type="password"
                        name="passwordRepeat"
                        placeholder="비밀번호 재확인 입력"
                        v-model.trim="passwordRepeat"
                        v-validate="{ is: signupData.password }"
                        :state="!errors.has('passwordRepeat')"/>
                    <b-form-invalid-feedback>{{ errors.first('passwordRepeat') }}</b-form-invalid-feedback>
                </b-form-group>
            </b-col>
            <name-form
                class="col-12"
                v-model="signupData.name"
                ref="nameForm"
                v-validate="{
                    rules: {
                        required: true,
                        regex: regex.name,
                    }
                }"
                data-vv-name="name"
                :state="!errors.has('name')"
                :feedback-msg="errors.first('name')">
            </name-form>
            <terms-agree-form
                v-model="terms"
                ref="termsAgreeForm"
                data-name="terms-agree"
                class="col-12">
            </terms-agree-form>
            <b-col cols="12">
                <b-button
                    type="submit"
                    variant="primary">
                    <span v-show="!isBusy">가입하기</span>
                    <i v-show="isBusy" class="fas fa-spin fa-circle-notch"></i>
                </b-button>
            </b-col>
        </b-row>
    </b-form>
</div>
</template>

<style lang="scss" scoped>
@import 'src/styles/utils/__module__';

div[data-name="terms-agree"] {
    margin-top: 1rem;;
}

.btn[type="submit"] {
    margin: 1.5rem 0;
    width: 100%;
    i {
        color: $white;
    }
}
</style>

<script lang="ts">
/**
 * @class SignupForm
 * @member { any } $refs from Vue
 * @member { Function } isExistEmail from isExistUserMixin
 * @member { Function } getPasswordLevel from PasswordMixin
 * @member { UserSignupData } signupData
 * @member { string } passwordRepeat 비밀번호 재입력 모델
 * @member { string } socialAccount
 * @member { boolean } isBusy
 * @member { any } errors from vee-validate
 * @member { regex } regex from Validate helper
 * @member { SignupTerms } terms
 */
import { Vue, Component } from 'vue-property-decorator';
import { isExistUserMixin } from '@/mixins/IsExistUser.mixin';
import { PasswordMixin } from '@/mixins/Password.mixin';
import { UserSignupData } from '@/interfaces/User.interface';
import { SignupTerms } from '@/interfaces/Form.interface';
import APIAuth from '@/api/APIAuth';
import Validate from '@/helpers/Validate';
import EmailForm from '@/components/forms/Email.form.vue';
import NameForm from '@/components/forms/Name.form.vue';
import TermsAgreeForm from '@/components/forms/TermsAgree.form.vue';

@Component({
    name: 'SignupForm',
    mixins: [ isExistUserMixin, PasswordMixin ],
    components: { EmailForm, NameForm, TermsAgreeForm },
})
class SignupForm extends Vue {
    $refs: {
        emailForm: any,
        nameForm: any,
        termsAgreeForm: any,
    }
    isExistEmail: Function;
    getPasswordLevel: Function;
    signupData: UserSignupData;
    passwordRepeat: string;
    isBusy: boolean;
    errors: any;
    regex: any;
    terms: SignupTerms;

    constructor () {
        super();

        this.signupData = {
            email: null,
            password: null,
            name: null,
            privacyPolicyAccepted: false,
            termsOfServiceAccepted: false,
            emailAccepted: false,
        };

        this.passwordRepeat = null;
        this.isBusy = false;
        this.regex = {
            name: Validate.getRegex('name'),
        };
        this.terms = null;
    }

    get passwordLevelText (): string {
        const level = this.getPasswordLevel(this.signupData.password);
        if (level === 'perfect') {
            return '완벽한 비밀번호네요!';
        }
        else if (level === 'high') {
            return '보안 수준이 높은 비밀번호네요!';
        }
        else if (level === 'warning') {
            return '음...조금 더 어렵게 하는 게 좋지 않을까요?';
        }
        else {
            return '';
        }
    }

    /**
     * @method submit
     * @desc signupData를 사용하여 서버에 회원가입 요청을 보내고
     * 성공한다면 부모 컴포넌트로 결과를 emit한다
     * @return { Promise<any> }
     */
    async submit (): Promise<any> {
        try {
            const validateResult = await this.$validator.validateAll();
            if (validateResult && this.validateTerms()) {
                this.setLoading(true);
                const signupResponse = await this.signup();
                this.$emit('submitted', {
                    accessToken: signupResponse.result.access_token,
                    refreshToken: signupResponse.result.refresh_token,
                });
            }
            else {
                return;
            }
        }
        catch (e) {
            this.setLoading(false);
        }
    }

    async signup (): Promise<any> {
        const model: UserSignupData = this.signupData;
        const terms: SignupTerms = this.terms;
        try {
            const data: UserSignupData = model;
            data.privacyPolicyAccepted = terms.privacyPolicy;
            data.termsOfServiceAccepted = terms.terms;
            data.emailAccepted = terms.sendEmail;
            const response = await APIAuth.signup(data);
            return response;
        }
        catch (e) {}
    }

    /**
     * @method validateTerms
     * @return { boolean }
     */
    validateTerms () {
        if (this.terms) {
            return true;
        }
        else {
            alert('필수 약관을 확인 후 동의해주세요!');
            return false;
        }
    }

    /**
     * @method setLoading
     * @argument { boolean } bool
     * @desc signup 요청이 진행 중 인지 여부를 설정한다
     */
    setLoading (bool: boolean): void {
        this.isBusy = bool;
    }

    mounted () {
        const email = this.$route.query.email;
        const name = this.$route.query.name;
        const lastName = this.$route.query.lastName;
        if (email) {
            this.$refs.emailForm.setEmail(email);
        }
        if (name) {
            if (lastName) {
                this.$refs.nameForm.setName(name, lastName);
            }
            else {
                this.$refs.nameForm.setName(name);
            }
        }
    }
}
export default SignupForm;
</script>
