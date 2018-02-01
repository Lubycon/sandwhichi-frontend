<template>
<div class="container row">
    <div class="col-12 col-md-6 col-lg-4 card card--center-form">
        <div class="logo">
            <router-link :to="{ name: 'home' }">
                <img :src="logo" alt="pixelstairs-logo" title="pixelstairs-logo">
                <p>Welcome to Pixelstairs!</p>
            </router-link>
        </div>

        <div class="card-body">
            <signup-form :is-busy="isBusy" @submit="postData"></signup-form>
        </div>
    </div>
</div>
</template>

<style lang="scss">
@import 'src/styles/utils/__module__';

.logo {
    text-align: center;
    img[title="pixelstairs-logo"] {
        width: 250px;
        margin-bottom: 10px;
        @include mq('sm') {
            width: 150px;
        }
    }
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { LOGO } from '@/constants';
import { UserSignupData } from '@/interfaces/User.interface';
import APIAuth from '@/api/APIAuth';
import SignupForm from '@/components/forms/Signup.form.vue';

@Component({
    name: 'Signup',
    components: { SignupForm },
})
class Signup extends Vue {
    logo: string;
    isBusy: boolean;

    constructor () {
        super();

        this.logo = LOGO;
        this.isBusy = false;
    }

    @State('auth') AuthState;
    @Action('setToken') setToken;
    @Action('setUserByAPI') setUserByAPI;

    async postData (signupData: UserSignupData) {
        this.isBusy = true;
        try {
            const signupResponse = await APIAuth.signup(signupData);
            this.setToken({
                accessToken: signupResponse.result.access_token,
                refreshToken: signupResponse.result.refresh_token,
            });
            this.setUserByAPI().then(res => {
                this.$router.push({ name: 'auth-grade' });
                this.isBusy = false;
            });
        }
        catch (e) {}
    }
}
export default Signup;
</script>
