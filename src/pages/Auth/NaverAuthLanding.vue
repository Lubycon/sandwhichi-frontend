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
