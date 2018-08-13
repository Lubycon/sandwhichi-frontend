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
        const userEmail = this.$route.query.email;
        try {
            await APIAuth.checkPasswordCertCode(userEmail, this.code);
            this.$router.push({
                name: 'user-setting-password',
                params: { code: this.code },
            });
        }
        catch (e) {
            this.isLoaded = true;
            this.$set(this, 'errCode', e.status);
            console.error('Failed cert code in password landing');
        }
    }
}
export default AuthPasswordLanding;
</script>
