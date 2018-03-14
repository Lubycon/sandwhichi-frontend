<template>
<div class="account-form">
    <div
        class="form-wrapper"
        :class="isValidEmail ? 'right-form' : 'left-form'">
        <!-- Email Step -->
        <b-form @submit.prevent="checkEmail" novalidate>
            <b-form-group>
                <b-form-input
                    ref="emailInput"
                    type="email"
                    name="email"
                    v-model.trim="email"
                    placeholder="이메일"
                    x-autocompletetype="off"
                    autocompletetype="off"
                    autocomplete="off"
                    autocorrect="off"
                    spellcheck="off"
                    autocapitalize="off"
                    :state="!errors.has('email')"/>
                <b-form-invalid-feedback>{{ errors.first('email') }}</b-form-invalid-feedback>
            </b-form-group>
            <b-button
                type="submit"
                variant="primary">
                <span v-show="!isBusyIsValidaEmail">다음</span>
                <i v-show="isBusyIsValidaEmail" class="fas fa-spin fa-circle-notch"></i>
            </b-button>
            <b-button
                type="button"
                variant="naver"
                data-sns="naver"
                @click="authNaver">
                네이버 계정으로 계속하기
            </b-button>
            <b-button
                type="button"
                variant="google"
                data-sns="google"
                @click="authGoogle">
                구글 계정으로 계속하기
            </b-button>
            <div class="signup-field">
                <p>아직 회원이 아니신가요?</p>
                <router-link :to="{ name: 'signup' }">회원가입</router-link>
            </div>
        </b-form>
        <!-- /Email Step -->
        <!-- Password Step -->
        <b-form @submit.prevent="submit" novalidate>
            <h2 data-name="email">{{ email }}</h2>
            <b-form-group>
                <b-form-input
                    ref="passwordInput"
                    type="password"
                    name="password"
                    v-model.trim="password"
                    placeholder="비밀번호"
                    :state="!errors.has('password')"/>
                <b-form-invalid-feedback>{{ errors.first('password') }}</b-form-invalid-feedback>
            </b-form-group>
            <!-- RECAPTCHA -->
            <re-captcha
                ref="recaptcha"
                @verify="onVertifyReCaptcha"
                @error="onErrorReCaptcha">
            </re-captcha>
            <!-- /RECAPTCHA -->
            <b-button
                type="submit"
                variant="primary">
                <span v-show="!isBusySignin">로그인</span>
                <i v-show="isBusySignin" class="fas fa-spin fa-circle-notch"></i>
            </b-button>
            <div class="signup-field">
                <div>
                    <p>비밀번호를 잊으셨나요?</p>
                    <router-link :to="{ name: 'find-password' }">비밀번호 찾기</router-link>
                </div>
                <div>
                    <p>Or</p>
                    <router-link :to="{ name: 'signup' }">회원가입 하기</router-link>
                </div>
            </div>
        </b-form>
        <!-- /Password Step -->
    </div>
</div>
</template>

<style lang="scss" scoped>
@import 'src/styles/utils/__module__';

$margin: 1rem;

.account-form {
    position: relative;
    overflow-x: hidden;

    .form-wrapper {
        width: 200%;
        transition: transform 0.4s ease-in;
        &.left-form {
            transform: translateX(0);
        }
        &.right-form {
            transform: translate(-50%);
        }
    }

    form {
        display: inline-block;
        width: 50%;
        vertical-align: top;
        padding: 0 20px;

        div.signup-field {
            text-align: center;
            p, a {
                display: inline-block;
            }
            p {
                margin-right: $margin;
            }
            a {
                text-decoration: underline;
            }
        }
        h2[data-name="email"] {
            text-align: left;
            font-size: 1rem;
        }
        button.btn {
            width: 100%;
            margin-bottom: 1rem;
        }
    }
}

input[type="email"], input[type="password"] {
    margin-bottom: $margin;
}

button.btn[type="submit"] {
    i {
        color: $white;
    }
}
</style>

<script lang="ts">
/**
 * @class SigninForm
 * @extends Vue
 * @member { any } $refs from Vue
 * @member { any } $googleAuth from VuePlugin
 * @member { any } $naverAuth from VuePlugin
 * @member { any } errors from vee-validate
 * @member { Function } checkIsExistEmail from isExistUserMixin
 * @member { string } email
 * @member { string } password
 * @member { string } reCaptchaToken
 * @member { boolean } isValidEmail
 * @member { boolean } isBusyIsValidEmail 이메일 비동기 밸리데이션 로딩 체크
 * @member { boolean } isBusySignin 로그인 로딩 체크
 * @member { boolean } isEnableReCaptcha 리캡챠를 사용하는 지의 여부
 * @member { number } invalidCount 사용자가 로그인에 실패한 횟수
 * @member { number } maxInvalidCount 사용자가 로그인에 실패할 수 있는 최대 횟수
 */

import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { isExistUserMixin } from '@/mixins/IsExistUser.mixin';
import { UserSigninData } from '@/interfaces/User.interface';
import APIAuth from '@/api/APIAuth';
import ReCaptcha from '@/components/utils/ReCaptcha.vue';

@Component({
    name: 'SigninForm',
    mixins: [ isExistUserMixin ],
    components: { ReCaptcha },
})
class SigninForm extends Vue {
    $refs: {
        emailInput: any,
        passwordInput: any,
        recaptcha: any,
    }
    $googleAuth: any;
    $naverAuth: any;
    errors: any;
    checkIsExistEmail: Function;
    email: string;
    password: string;
    reCaptchaToken: string;
    isValidEmail: boolean;
    isBusyIsValidaEmail: boolean;
    isBusySignin: boolean;
    isEnableReCaptcha: boolean;
    invalidCount: number;
    maxInvalidCount: number;

    constructor () {
        super();

        this.email = null;
        this.password = null;
        this.reCaptchaToken = null;
        this.isValidEmail = false;
        this.isBusyIsValidaEmail = false;
        this.isBusySignin = false;
        this.isEnableReCaptcha = false;
        this.invalidCount = 0;
        this.maxInvalidCount = 5;
    }

    @Action('setGoogleToken') setGoogleToken;

    /**
     * @event onChangeInvalidCount
     * @desc 현재 signinForm에 리캡챠가 실행되고 있지 않고,
     * 유저가 비밀번호를 5회 이상 틀렸다면 리캡챠를 실행시킨다
     */
    @Watch('invalidCount')
    onChangeInvalidCount (value) {
        if (!this.isEnableReCaptcha && (value >= this.maxInvalidCount)) {
            this.setReCaptcha(true);
        }
    }

    /**
     * @method checkEmail
     * @return { Promise<boolean> }
     * @desc 모델에서 email값을 가져와 validation을 진행한다
     * validation에 통과한다면 폼이 다음 스텝으로 이동 후, 비밀번호 인풋에 포커스가 잡힌다
     * setTimeout의 값은 css에 있는 폼 이동 transition보다 100ms 높은 값이다
     */
    async checkEmail (): Promise<boolean> {
        this.setCheckEmailLoading(true);
        try {
            const validate = await this.$validator.validate('email', this.email);
            this.isValidEmail = validate;
            this.setCheckEmailLoading(false);

            if (this.isValidEmail) {
                setTimeout(() => this.$refs.passwordInput.$el.focus(), 500);
            }

            return validate;
        }
        catch (e) {
            this.setCheckEmailLoading(false);
            throw new Error(e);
        }
    }

    /**
     * @method checkPassword
     * @return { Promise<boolean> }
     * @desc 모델에서 password값을 가져와 validation을 진행한다.
     * validation에 통과한다면 submit메소드를 호출하여 로그인을 진행한다
     */
    async checkPassword (): Promise<boolean> {
        try {
            const validate = await this.$validator.validate('password', this.password);
            if (validate) {
                this.submit();
            }
            return validate;
        }
        catch (e) {
            throw new Error(e);
        }
    }

    /**
     * @method submit
     * @desc UserSigninData를 사용하여 서버에 로그인 요청을 보낸다
     * 요청에 성공 시 부모 컴포넌트로 token을 emit한다
     * 요청에 실패 시 0061(맞지 않는 데이터로 인한 실패)에러라면 invalidCount를 업데이트한다
     *
     * @TODO - 2018.02.15 Evan
     * 현재 구글 리캡챠는 클라이언트에서만 체크 중 이나,
     * 보안 강도를 올리려면 서버로 토큰을 던져서 구글에 다시 한번 인증을 받는 이중 처리를 하는 것이 좋음
     */
    async submit (): Promise<string> {
        // ReCaptcha Check
        if (this.isEnableReCaptcha && !this.reCaptchaToken) {
            alert('로봇이 아닌 걸 증명해라 닝겐');
            return;
        }

        this.setLoading(true);
        this.setPasswordErrorWithSignin(false);

        try {
            const data: UserSigninData = {
                email: this.email,
                password: this.password,
            };
            const signinResponse = await APIAuth.signin(data);
            this.$emit('submitted', {
                accessToken: signinResponse.result.access_token,
                refreshToken: signinResponse.result.refresh_token,
            });
            return signinResponse;
        }
        catch (e) {
            if (e && e.data) {
                const code = e.data.status.code;
                if (code === '0061') {
                    this.addInvalidCount(1);
                }
            }
            this.setPasswordErrorWithSignin(true);
            this.setLoading(false);
            return '';
        }
    }

    /**
     * @method authGoogle
     * @desc 구글 계정을 사용한 인증을 진행한다
     */
    async authGoogle () {
        try {
            const response = await this.$googleAuth.signin();
            const token = response.token;
            this.setGoogleToken(token);
            const signin = await APIAuth.signinGoogle(token);
            console.log(signin);
            
            return response;
        }
        catch (e) {
            throw new Error(e);
        }
    }

    /**
     * @method authNaver
     * @desc 네이버 계정을 사용한 인증을 진행한다
     */
    authNaver () {
        this.$naverAuth.signin('/auth/naver');
    }

    /**
     * @method setReCaptcha
     * @desc 리캡챠 사용 여부를 변경한다. 컴포넌트 외부에서 호출할 수도 있다.
     */
    setReCaptcha (bool: boolean): void {
        this.isEnableReCaptcha = bool;
        if (bool) {
            this.$refs.recaptcha.start();
        }
        else {
            this.$refs.recaptcha.destroy();
        }
    }

    /**
     * @method onVertifyReCaptcha
     * @argument { string } response
     * @desc 리캡챠 인증이 성공했을 시 콜백
     */
    onVertifyReCaptcha (response: string): void {
        console.log('signin -> ', response);
        this.reCaptchaToken = response;
    }

    /**
     * @method onErrorReCaptcha
     * @argument { any } err
     * @desc 리캡챠 인증이 실패했을 시 콜백
     */
    onErrorReCaptcha (err: any): void {
        if (err) {}
        this.reCaptchaToken = null;
    }

    /**
     * @method setPasswordErrorWithSignin
     * @argument { boolean } bool
     * @desc 패스워드 폼에 패스워드 불일치 에러를 셋 한다
     */
    setPasswordErrorWithSignin (bool: boolean): void {
        if (bool) {
            let msg = '비밀번호가 일치하지 않습니다';
            if (this.invalidCount >= (this.maxInvalidCount + 1)) {
                msg = '저기… 이만하면 바꿔보는 건 어떨까요?';
            }
            this.errors.add('password', msg, 'wrongPassword');
        }
        else {
            this.errors.remove('password');
        }
    }

    /**
     * @method addInvalidCount
     * @argument { number } count
     */
    addInvalidCount (count: number): void {
        this.invalidCount += count;
    }

    /**
     * @method addInvalidCount
     * @argument { boolean } bool
     */
    setCheckEmailLoading (bool: boolean): void {
        this.isBusyIsValidaEmail = bool;
    }

    /**
     * @method setLoading
     * @argument { boolean } bool
     * @desc signin 요청이 진행 중 인지 여부를 설정한다
     */
    setLoading (bool: boolean): void {
        this.isBusySignin = bool;
    }

    created () {
        this.$validator.attach('email', 'required|email|existEmail');
        this.$validator.attach('password', 'required');
    }
}
export default SigninForm;
</script>
