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
        <send-mail-form
            api="users.pwd.mail"
            @submit="submit"
        />
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

@Component({
    name: 'AuthSendMail',
    components: { SendMailForm },
})
class AuthSendMail extends Vue {
    email: string;
    isDone: boolean;

    constructor () {
        super();
        this.email = null;
        this.isDone = false;
    }

    submit ({ res, email }): void {
        if (res.status.code === '000') {
            this.isDone = true;
            this.$set(this, 'email', email);
        }
    }
}
export default AuthSendMail;
</script>
