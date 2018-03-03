<template>
<b-container fluid v-cloak>
    <b-row>
        <!-- Signup Contents -->
        <!-- @TODO 추후 컴포넌트로 분리할 것 -->
        <b-col
            data-name="signup-contents"
            class="d-none d-lg-block"
            cols="4">
            <router-link class="logo" :to="{ name: 'home' }">
                <img :src="logoWhite" alt="home" title="sandwhichi">
            </router-link>
            <div v-swiper:mySwiper="swiperOptions">
                <div class="swiper-wrapper">
                    <div
                        v-for="item in signupContents"
                        class="swiper-slide"
                        :key="item.id"
                        :style="{ 'background-image': `url(${item.thumbnail})` }">
                        <div data-name="swiper-contents">
                            <p>"{{ item.contents }}"</p>
                            <h4>- {{ item.author }} -</h4>
                        </div>
                    </div>
                </div>
            </div>
        </b-col>
        <!-- Signup Contents -->
        <b-col
            data-name="signup-form"
            cols="12"
            offset-sm="2"
            sm="8"
            offset-lg="1"
            lg="6"
            offset-xl="2"
            xl="4">
            <div
                data-name="logo"
                class="d-block d-md-none">
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

<style lang="scss" scoped>
@import 'src/styles/utils/__module__';

div[data-name="signup-contents"] {
    padding: 0;
    a.logo {
        position: absolute;
        top: 1rem;
        left: 2rem;
        z-index: 5;
        img {
            width: 2.5rem;
            height: 2.5rem;
        }
    }
    .swiper-container {
        height: 100vh;
    }
    .swiper-wrapper, .swiper-slide {
        height: 100%;
    }
    .swiper-slide {
        @include backgroundCover;
    }
    div[data-name="swiper-contents"] {
        position: absolute;
        bottom: 0;
        padding: 0 1rem 3rem 2rem;
        h4, p {
            color: $white;
            font-size: 0.9rem;
        }
        h4 {
            text-align: center;
            margin-top: 2rem;
        }
    }
}
div[data-name="signup-form"] {
    padding: 1rem 2rem;
    @include mq('sm') {
        padding: {
            left: 1rem;
            right: 1rem;
        }
        margin-top: $global-header-height;
    }
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
/**
 * @class Signup
 * @extends Vue
 * @member { any } $refs from Vue
 * @member { string } logo
 * @member { string } logoWhite
 * @member { Object } swiperOptions
 * @member { SignupContent[] } signupContents
 */
import { Vue, Component } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { ICON_LOGO, ICON_LOGO_WHITE } from '@/constants';
import { SIGNUP_CONTENTS } from '@/constants/form.constant';
import { SignupContent } from '@/interfaces/Form.interface';
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
    logoWhite: string;
    swiperOptions: Object;
    signupContents: SignupContent[];

    constructor () {
        super();

        this.logo = ICON_LOGO;
        this.logoWhite = ICON_LOGO_WHITE;
        this.swiperOptions = {
            autoplay: {
                delay: 4000,
            },
            speed: 2000,
            loop: true,
            effect: 'fade',
        };
        this.signupContents = SIGNUP_CONTENTS;
    }

    @State('auth') AuthState;
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

            this.signupResolve();

            return userDataResponse;
        }
        catch (e) {
            this.$refs.signupForm.setLoading(false);
        }
    }

    /**
     * @method signupResolve
     * @desc 회원가입 후 로그인과 유저 데이터 바인딩까지 성공하면 실행된다.
     * 현재 라우터에 queryParam으로 되돌아갈 url이 있다면 거기로 이동시킨다.
     * 없다면, home으로 이동시킨다.
     */
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
