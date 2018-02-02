<template>
<div class="container" v-if="isLoaded">
    <h1>Password landing</h1>
    <p>{{ codeValidationResult }}</p>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import APIAuth from '@/api/APIAuth';

@Component({
    name: 'AuthPasswordLanding',
})
class AuthPasswordLanding extends Vue {
    codeValidationResult: boolean;

    isLoaded: boolean;
    errCode: string;

    @Prop({ required: true })
    code: string;

    async created () {
        try {
            const certCodeResponse = await APIAuth.checkPasswordCertCode(this.code);
            if (certCodeResponse.result.validity) {
                this.$router.push({
                    name: 'user-setting-password',
                    params: { code: this.code },
                });
            }
            else {
                console.error('Failed cert code in password landing');
            }
        }
        catch (e) {
            this.isLoaded = true;
            this.$set(this, 'errCode', e.status);
        }
    }
}
export default AuthPasswordLanding;
</script>
