<template>
<div class="account-form">
    <b-form-row @submit.prevent="submit" autocomplete="off" novalidate>
        <b-col cols="12">
            <b-form-group label="이메일">
                <b-form-input
                    type="email"
                    name="email"
                    v-model.trim="signupData.email"
                    placeholder="ex) evan1125@pixelstairs.com"
                    v-validate="'required|email|existEmail'"
                    data-vv-delay="500"
                    :class="{ 'has-error': errors.has('email') }"
                    autocomplete="off"
                />
                <b-form-text v-if="errors.has('email')" class="is-invalid">{{ errors.first('email') }}</b-form-text>
            </b-form-group>
        </b-col>
        <b-col cols="12">
            <b-form-group label="비밀번호">
                <b-form-input
                    type="password"
                    name="password"
                    v-model.trim="signupData.password"
                    v-validate="'required|security'"
                    :class="{ 'has-error': errors.has('password') }"
                />
                <b-form-text v-if="errors.has('password')" class="is-invalid">{{ errors.first('password') }}</b-form-text>
                <b-form-text class="has-score" :class="getPasswordLevel(signupData.password)">
                    Security Level: {{ getPasswordLevel(signupData.password) }}
                </b-form-text>
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
    </b-form-row>
</div>
</template>

<style lang="scss" scoped>
@import 'src/styles/utils/__module__';

small {
    a {
        color: $grey-900;
        font-weight: bold;
        text-decoration: underline;
    }
}

.btn[type="submit"] {
    margin: 20px 0;
    width: 100%;
    background-color: $bluegrey-800;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { isExistUserMixin } from '@/mixins/IsExistUser.mixin';
import { PasswordMixin } from '@/mixins/Password.mixin';
import { UserSignupData } from '@/interfaces/User.interface';
import Validate from '@/helpers/Validate';

@Component({
    name: 'SignupForm',
    mixins: [ isExistUserMixin, PasswordMixin ],
})
class SignupForm extends Vue {
    isExistEmail: Function;
    isExistName: Function;

    signupData: UserSignupData;

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

    submit (): void {
        const signupData: UserSignupData = this.signupData;

        this.$validator.validateAll();
        if (this.errors.any()) {
            console.log(this.errors);
        }
        else {
            this.$emit('submit', signupData);
        }
    }
}
export default SignupForm;
</script>
