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
                @submitted="updateMember">
            </signup-form>
        </b-col>
    </b-row>
</b-container>
</template>

<style lang="scss">
@import 'src/styles/utils/__module__';

div[data-name="signup-form"] {
    div[data-name="logo"] {
        a {
            display: block;
        }
        img {
            width: 50px;
        }
    }
    div[data-name="page-title"] {
        h1 {
            font-size: 1.5rem;
        }
        p {
            font-size: 0.8rem;
        }
    }
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { ICON_LOGO } from '@/constants';
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

    async updateMember ({ accessToken, refreshToken }): Promise<any> {
        try {
            this.setToken({ accessToken, refreshToken });
            const userDataResponse = await this.setUserByAPI();

            this.signupResolve();

            return userDataResponse;
        }
        catch (e) {
            this.$refs.signupForm.setLoading(false);
        }
    }

    signupResolve (): void {
        if (this.$route.query.redirect) {
            this.$router.push({ path: this.$route.query.redirect });
        }
        else {
            this.$router.push({ name: 'home' });
        }
    }
}
export default Signup;
</script>
