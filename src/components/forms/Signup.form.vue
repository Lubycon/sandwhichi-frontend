<template>
<div class="account-form">
    <b-form @submit.prevent="submit" autocomplete="off" novalidate>
        <b-row>
            <email-form
                class="col-12"
                v-model="signupData.email"
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
                v-model="signupData.nickname"
                v-validate="{
                    rules: {
                        required: true,
                        regex: regex.name,
                    }
                }"
                data-vv-name="name"
                :state="!errors.has('name')"
                :feedback-msg="errors.first('name')"
            ></name-form>
            <terms-agree-form
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
    margin: 20px 0;
    width: 100%;
    i {
        color: $white;
    }
}
</style>

<script lang="ts">
/**
 * @class SignupForm
 * @member { Function } isExistEmail from isExistUserMixin
 * @member { Function } getPasswordLevel from PasswordMixin
 * @member { UserSignupData } signupData
 * @member { string } passwordRepeat 비밀번호 재입력 모델
 * @member { string } firstName 유저의 이름
 * @member { string } lastName 유저의 성
 * @member { boolean } isBusy
 * @member { any } errors from vee-validate
 * @member { regex } regex from Validate helper
 */
import { Vue, Component } from 'vue-property-decorator';
import { isExistUserMixin } from '@/mixins/IsExistUser.mixin';
import { PasswordMixin } from '@/mixins/Password.mixin';
import { UserSignupData } from '@/interfaces/User.interface';
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
    isExistEmail: Function;
    getPasswordLevel: Function;
    signupData: UserSignupData;
    passwordRepeat: string;
    isBusy: boolean;
    errors: any;
    regex: any;

    constructor () {
        super();

        this.signupData = {
            email: null,
            password: null,
            nickname: null,
            termsOfServiceAccepted: true,
            newsletterAccepted: true,
        };

        this.passwordRepeat = null;
        this.isBusy = false;
        this.regex = {
            name: Validate.getRegex('name'),
        };
    }

    get passwordLevelText () {
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
     */
    async submit (): Promise<any> {
        this.setLoading(true);
        try {
            const data: UserSignupData = this.signupData;
            const validateResult = await this.$validator.validateAll();
            if (validateResult) {
                const signupResponse = await APIAuth.signup(data);
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

    setLoading (bool: boolean): void {
        this.isBusy = bool;
    }
}
export default SignupForm;
</script>
