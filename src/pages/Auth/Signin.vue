<template>
<b-container>
    <b-row>
        <b-col
            cols="12"
            sm="8"
            md="6"
            lg="4"
            class="card card--center-form">
            <div class="logo">
                <router-link :to="{ name: 'home' }">
                    <img :src="logo" alt="샌드위치" title="샌드위치 로고">
                </router-link>
            </div>
            <div class="card-body">
                <signin-form
                    ref="signinForm"
                    @submitted="updateMember">
                </signin-form>
            </div>
        </b-col>
    </b-row>
</b-container>
</template>

<style lang="scss">
@import 'src/styles/utils/__module__';

.logo {
    text-align: center;
    img {
        width: 150px;
        margin-bottom: 0.5rem;
        @include mq('sm') {
            width: 250px;
        }
    }
}

.card--center-form {
    input {
        padding: 0.75rem 1rem;
        background: transparent;
    }
}

.btn-link {
    padding: $card-padding;
    color: $grey700;
    text-align: right;
    font-size: 0.8rem;
    @include mq('sm') {
        font-size: 1rem;
    }
}
</style>

<script lang="ts">
/**
 * @class Signin
 * @extends Vue
 * @member { any } $refs from Vue
 * @member { string } logo
 */
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { VERTICAL_LOGO } from '@/constants';
import SigninForm from '@/components/forms/Signin.form.vue';

@Component({
    name: 'Signin',
    components: { SigninForm },
})
class Signin extends Vue {
    $refs: {
        signinForm: any,
    }
    logo: string;

    constructor () {
        super();

        this.logo = VERTICAL_LOGO;
    }

    @Action('setToken') setToken;
    @Action('setUserByAPI') setUserByAPI;

    /**
     * @method updateMember
     * @argument { any } signinResponse
     * @return { Promise<any> }
     * @desc 인자로 넘겨받은 토큰을 사용하여 auth스토어에 유저 데이터를 주입한다.
     */
    async updateMember ({ accessToken, refreshToken }): Promise<any> {
        try {
            this.setToken({ accessToken, refreshToken });
            const userDataResponse = await this.setUserByAPI();

            this.signinResolve();

            return userDataResponse;
        }
        catch (e) {
            this.$refs.signinForm.setSigninLoading(false);
        }
    }

    /**
     * @method signinResolve
     * @desc 로그인과 유저 데이터 바인딩까지 성공하면 실행된다.
     * 현재 라우터에 queryParam으로 되돌아갈 url이 있다면 거기로 이동시킨다.
     * 없다면, home으로 이동시킨다.
     */
    signinResolve (): void {
        if (this.$route.query.redirect) {
            this.$router.push({ path: this.$route.query.redirect });
        }
        else {
            this.$router.push({ name: 'home' });
        }
    }
}
export default Signin;
</script>
