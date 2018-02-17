<template>
<b-container>
    <b-row>
        <b-col
            data-name="signup-form"
            cols="12"
            sm="8"
            md="6"
            lg="4">
            <div data-name="logo">
                <router-link :to="{ name: 'home' }">
                    <img :src="logo" alt="home" title="sandwhichi">
                </router-link>
            </div>
            <div data-name="page-title">
                <h1>회원가입</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <signup-form
                ref="signupform"
                @submit="postData">
            </signup-form>
        </b-col>
    </b-row>
</b-container>
</template>

<style lang="scss">
@import 'src/styles/utils/__module__';

div[data-name="signup-form"] {
    div[data-name="logo"] {
        width: 50px;
    }
    div[data-name="page-title"] {
        h1 {
            font-size: 1rem;
        }
    }
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { ICON_LOGO } from '@/constants';
import { UserSignupData } from '@/interfaces/User.interface';
import APIAuth from '@/api/APIAuth';
import SignupForm from '@/components/forms/Signup.form.vue';

@Component({
    name: 'Signup',
    components: { SignupForm },
})
class Signup extends Vue {
    $refs: {
        signupForm: any,
    }
    logo: string;
    isBusy: boolean;

    constructor () {
        super();

        this.logo = ICON_LOGO;
    }

    @State('auth') AuthState;
    @Action('setToken') setToken;
    @Action('setUserByAPI') setUserByAPI;

    async postData (data: UserSignupData) {
        this.isBusy = true;
        try {
            const signupResponse = await APIAuth.signup(data);
            this.setToken({
                accessToken: signupResponse.result.access_token,
                refreshToken: signupResponse.result.refresh_token,
            });
            this.setUserByAPI().then(res => {
                this.$router.push({ name: 'auth-grade' });
                this.isBusy = false;
            });
        }
        catch (e) {
            this.isBusy = false;
        }
    }
}
export default Signup;
</script>
