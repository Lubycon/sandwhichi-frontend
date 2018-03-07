<template>
<div>
    <p>인증 중 입니다...</p>
    code: {{ code }}<br>
    state: {{ state }}
</div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
/**
 * @class NaverAuthLanding
 * @extends Vue
 * @member { string } code Naver에서 리턴해준 인증 코드
 * @member { string } state Sandwhichi에서 발급했던 상태 코드
 * @desc 해당 페이지는 사용자가 네이버 계정 인증을 진행한 후에 리다이렉트 되는 페이지이다.
 * code와 state를 sandwhichi api서버로 전송해 2차 검증을 실시하고,
 * 회원가입 여부에 따라 로그인을 시키거나 회원가입 페이지로 랜딩시킨다
 */
import { Vue, Component } from 'vue-property-decorator';

@Component({
    name: 'AuthNaverLanding',
})
class AuthNaverLanding extends Vue {
    code: string = '';
    state: string = '';

    created () {
        this.code = this.$route.query.code;
        this.state = this.$route.query.state;
    }
}
export default AuthNaverLanding;
</script>
