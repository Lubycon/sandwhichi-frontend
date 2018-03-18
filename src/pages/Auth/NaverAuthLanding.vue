<template>
<div>
    <p>인증 중 입니다...</p>
</div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
/**
 * @class NaverAuthLanding
 * @extends Vue
 * @member { any } $naverAuth from VuePlugin
 * @member { string } redirect 로그인 성공 시 리다이렉트 될 route 이름
 * @member { string } error Naver에서 리턴해준 에러 코드
 * @member { string } errorDescription
 * @member { string } naverUserEmail
 * @member { string } naverUserName
 * @desc 해당 페이지는 사용자가 네이버 계정 인증을 진행한 후에 리다이렉트 되는 페이지이다.
 * code와 state를 sandwhichi api서버로 전송해 2차 검증을 실시하고,
 * 회원가입 여부에 따라 로그인을 시키거나 회원가입 페이지로 랜딩시킨다
 */
import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import APIAuth from '@/api/APIAuth';

@Component({
    name: 'AuthNaverLanding',
})
class AuthNaverLanding extends Vue {
    $naverAuth: any;
    redirect: string = '';
    error: string = '';
    errorDescription: string = '';
    naverUserEmail: string = '';
    naverUserName: string = '';

    @Action('setNaverToken') setNaverToken;
    @Action('setToken') setToken;
    @Action('setUserByAPI') setUserByAPI;
    @Getter('getNaverToken') getNaverToken;

    /**
     * @method signin
     * @return { Promise<any> }
     * @desc 네이버 로그인 진행 후 받아온 토큰을 사용하여 Sandwhichi로그인을 진행한다
     */
    async signin (): Promise<any> {
        try {
            const token = this.getNaverToken;
            const signinResponse = await APIAuth.signinNaver(token);
            const accessToken = signinResponse.result.access_token;
            const refreshToken = signinResponse.result.refresh_token;
            
            this.setToken({ accessToken, refreshToken });
            await this.setUserByAPI();
            this.$router.push({ name: this.redirect });

            return signinResponse;
        }
        catch (e) {
            if (e.status === 401) {
                this.$router.push({
                    name: 'signup',
                    query: {
                        email: this.naverUserEmail,
                        name: this.naverUserName,
                        social: 'naver',
                    },
                });
            }
            else {
                this.onErrorNaverAuth();
            }
        }
    }

    /**
     * @event onErrorNaverAuth
     * @desc 로그인이 실패했다면 router를 한 히스토리 뒤로 이동 시킨다
     */
    onErrorNaverAuth () {
        alert('네이버 로그인 정보를 받아오는 데 실패했습니다.');
        this.$router.go(-1);
    }

    created () {
        const redirectRoute = this.$route.query.state.split(':')[1];
        this.redirect = redirectRoute ? redirectRoute.split('=')[1] : this.$naverAuth.defaultSigninRedirect;
    }

    mounted () {
        this.error = this.$route.query.error;
        this.errorDescription = this.$route.query.errorDescription;

        // 네이버 로그인 후 발급받은 code와 state로 accessToken을 가져온다
        APIAuth.getUserNaver({
            code: this.$route.query.code,
            state: this.$route.query.state,
        }).then(res => {
            this.setNaverToken(res.result.accessToken);
            this.naverUserEmail = res.result.profile.email;
            this.naverUserName = res.result.profile.name;
            this.signin();
        }, err => {
            console.error(err);
            this.onErrorNaverAuth();
        });
    }
}
export default AuthNaverLanding;
</script>
