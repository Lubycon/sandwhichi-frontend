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
            <b-col cols="6">
                <b-form-group label="성">
                    <b-form-input
                        type="text"
                        name="lastName"
                        v-model.trim="lastName"
                        v-validate="{ rules: { required: true, regex: regex.name } }"
                        :class="{ 'has-error': errors.has('name') }"
                    />
                    <b-form-text v-if="errors.has('name')" class="is-invalid">{{ errors.first('name') }}</b-form-text>
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group label="이름">
                    <b-form-input
                        type="text"
                        name="firstName"
                        v-model.trim="firstName"
                        v-validate="{ rules: { required: true, regex: regex.name } }"
                        :class="{ 'has-error': errors.has('name') }"
                    />
                    <b-form-text v-if="errors.has('name')" class="is-invalid">{{ errors.first('name') }}</b-form-text>
                </b-form-group>
            </b-col>
            
            <small>
                If you press the button below, it is assumed that you have agreed to our
                <router-link :to="{ name: 'terms-of-service' }" target="_blank">Terms of service</router-link>
                and
                <router-link :to="{ name: 'privacy-policy' }" target="_blank">Privacy policy</router-link>.
            </small>
            <b-button type="submit">
                <span v-show="!isBusy">Join us!</span>
                <i v-show="isBusy" class="loading-ico pxs-spinner-1 spin"></i>
            </b-button>
        </b-row>
    </b-form>
</div>
</template>

<style lang="scss" scoped>
@import 'src/styles/utils/__module__';

small {
    a {
        color: $grey900;
        font-weight: bold;
        text-decoration: underline;
    }
}

.btn[type="submit"] {
    margin: 20px 0;
    width: 100%;
    background-color: $bluegrey800;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { isExistUserMixin } from '@/mixins/IsExistUser.mixin';
import { PasswordMixin } from '@/mixins/Password.mixin';
import { UserSignupData } from '@/interfaces/User.interface';
import Validate from '@/helpers/Validate';
import EmailForm from '@/components/forms/Email.form.vue';

@Component({
    name: 'SignupForm',
    mixins: [ isExistUserMixin, PasswordMixin ],
    components: { EmailForm },
})
class SignupForm extends Vue {
    isExistEmail: Function;
    getPasswordLevel: Function;

    signupData: UserSignupData;

    passwordRepeat: string;
    firstName: string;
    lastName: string;

    errors: any;
    regex: any;

    constructor () {
        super();

        this.signupData = {
            email: null,
            password: null,
            name: null,
            termsOfServiceAccepted: false,
        };

        this.passwordRepeat = null;
        this.firstName = null;
        this.lastName = null;
        this.regex = {
            name: Validate.getRegex('name'),
        };
    }

    @Prop({ default: false })
    isBusy: boolean;

    get username () {
        const name = `${this.lastName || ''}${this.firstName || ''}`;
        this.signupData.name = name;
        return name;
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

    async submit (): Promise<any> {
        const signupData: UserSignupData = this.signupData;

        const validateResult = await this.$validator.validateAll();
        if (validateResult) {
            this.$emit('submit', signupData);
        }
        else {
            throw new Error();
        }
    }
}
export default SignupForm;
</script>
