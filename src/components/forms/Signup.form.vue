<template>
<div class="account-form">
    <b-form @submit.prevent="submit" autocomplete="off" novalidate>
        <b-form-group label="Email">
            <b-form-input
                type="email"
                name="email"
                v-model.trim="signupData.email"
                placeholder="ex) evan1125@pixelstairs.com"
                v-validate="'required|email|existEmail'"
                :class="{ 'has-error': errors.has('email') }"
                autocomplete="off"
            />
            <b-form-text v-if="errors.has('email')" class="is-invalid">{{ errors.first('email') }}</b-form-text>
        </b-form-group>
        <b-form-group label="Password">
            <b-form-input
                type="password"
                name="password"
                v-model.trim="signupData.password"
                v-validate="'required|security'"
                :class="{ 'has-error': errors.has('password') }"
            />
            <b-form-text v-if="errors.has('password')" class="is-invalid">{{ errors.first('password') }}</b-form-text>
            <b-form-text class="has-score" :class="passwordLevel">
                Security Level: {{ passwordLevel }}
            </b-form-text>
        </b-form-group>
        <b-form-group label="First Name">
            <b-form-input
                type="text"
                name="firstName"
                v-model.trim="signupData.firstName"
                v-validate="{ rules: { required: true, regex: regex.name, existName: true } }"
                :class="{ 'has-error': errors.has('name') }"
            />
            <b-form-text v-if="errors.has('name')" class="is-invalid">{{ errors.first('name') }}</b-form-text>
        </b-form-group>
        <b-form-group label="Last Name">
            <b-form-input
                type="text"
                name="lastName"
                v-model.trim="signupData.lastName"
                v-validate="{ rules: { required: true, regex: regex.name, existName: true } }"
                :class="{ 'has-error': errors.has('name') }"
            />
            <b-form-text v-if="errors.has('name')" class="is-invalid">{{ errors.first('name') }}</b-form-text>
        </b-form-group>
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
    </b-form>
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
import { isExistUserMixin } from '@/mixins/is-exist-user.mixin';
import { PasswordMixin } from '@/mixins/password.mixin';
import { UserSignupData } from '@/interfaces/User.interface';
import ValidateService from '@/services/Validate.service';

@Component({
    name: 'SignupForm',
    mixins: [ isExistUserMixin, PasswordMixin ],
})
class SignupForm extends Vue {
    signupData: UserSignupData;
    errors: any;
    regex: any;

    constructor () {
        super();

        this.signupData = {
            email: null,
            password: null,
            firstName: null,
            lastName: null,
            termsOfServiceAccepted: false,
        };
        this.regex = {
            name: ValidateService.getRegex('name'),
        };
    }

    @Prop({ default: false })
    isBusy: boolean;

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
