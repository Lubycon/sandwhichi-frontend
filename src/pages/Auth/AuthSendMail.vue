<template>
<div class="container row">
    <div
        v-show="!isDone"
        class="col-12 col-md-6 col-lg-4 card card--center-form"
    >
        <div data-section="form-desc">
            <h1>Please enter your Email</h1>
            <p>The verification email will be sent to your address</p>
        </div>
        <send-mail-form :is-busy="isBusy" @submit="submit"></send-mail-form>
    </div>
    <div
        v-show="isDone"
        class="col-12 card card--center-form"
    >
        <div data-section="form-desc">
            <h1>The verification email has been sent to <strong>{{email}}</strong></h1>
            <p>Please check your email!</p>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import SendMailForm from '@/components/forms/SendMail.form.vue';
import APIAuth from '@/api/APIAuth';

@Component({
    name: 'AuthSendMail',
    components: { SendMailForm },
})
class AuthSendMail extends Vue {
    isBusy: boolean = false;
    isDone: boolean = false;

    async submit ({ email }): Promise<any> {
        this.isBusy = true;
        try {
            const emailResponse = await APIAuth.sendPasswordMail(email);
            this.isBusy = false;
            return emailResponse;
        }
        catch (e) {
            this.isBusy = false;
        }
    }
}
export default AuthSendMail;
</script>
