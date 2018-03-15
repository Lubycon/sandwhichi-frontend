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
    error: string = '';
    errorDescription: string = '';
    naverUserEmail: string = '';
    naverUserName: string = '';

    @Action('setNaverToken') setNaverToken;
    @Getter('getNaverToken') getNaverToken;

    async signin () {
        try {
            const token = this.getNaverToken;
            const response = await APIAuth.signinNaver(token);
            console.log(response);
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

    onErrorNaverAuth () {
        alert('네이버 로그인 정보를 받아오는 데 실패했습니다.');
        this.$router.go(-1);
    }

    mounted () {
        console.log(1);
        this.error = this.$route.query.error;
        this.errorDescription = this.$route.query.errorDescription;

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
