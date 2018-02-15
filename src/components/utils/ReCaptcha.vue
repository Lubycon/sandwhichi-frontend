<template>
<div ref="recaptcha"></div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
/**
 * @class ReCaptcha
 * @extends Vue
 * @member { string } reCaptchaKey 구글 리캡챠 클라이언트키
 * @member { string } reCaptchaId 리캡챠 렌더 후 부여받는 고유 ID
 */
/* global grecaptcha */

import { Vue, Component } from 'vue-property-decorator';
import { G_RECAPTCHA_KEY } from '@/constants/env.constant';

@Component({
    name: 'ReCaptcha',
})
class ReCaptcha extends Vue {
    $refs: {
        recaptcha: any,
    }
    reCaptchaKey: string;
    reCaptchaId: string;

    constructor () {
        super();

        this.reCaptchaKey = G_RECAPTCHA_KEY;
        this.reCaptchaId = null;
    }

    /**
     * @method start
     * @desc 리캡챠를 렌더한다
     */
    start (): void {
        if (grecaptcha) {
            const sitekey = this.reCaptchaKey;
            this.reCaptchaId = grecaptcha.render(this.$refs.recaptcha, {
                callback: this.onVerify,
                sitekey,
            });
        }
    }

    /**
     * @method destroy
     * @desc 리캡챠를 파괴한다. 리캡챠 내부에 destroy메소드가 없기 때문에 직접 구현 필요
     */
    destroy (): void {
        
    }

    /**
     * @method reset
     * @desc 리캡챠를 리셋한다
     */
    reset (): void {
        grecaptcha.reset(this.reCaptchaId);
    }

    /**
     * @private
     * @method onVertify
     * @argument { string } response
     * @desc 리캡챠 검사 후 토큰을 받는 콜백 메소드
     */
    onVerify (response: string): void {
        if (response && response.length) {
            this.$emit('verify', response);
        }
        else {
            this.$emit('error', response);
        }
    }
}
export default ReCaptcha;
</script>

