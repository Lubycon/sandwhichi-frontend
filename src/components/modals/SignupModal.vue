<template>
<b-modal class="signin-modal" ref="modal" :hide-footer="true">
    <span slot="modal-header-close">
        X
    </span>
    <div data-name="form-title">
        <h2>Is this your first time here?</h2>
        <p>Simply proceed to sign up and continue uploading your work!</p>
    </div>
    <signup-form :is-busy="isBusy" @submit="postData"></signup-form>
    <div data-name="form-signin">
        <b-button class="btn-border" :to="{ name: 'signin' }">
            I am not new here!
        </b-button>
    </div>
</b-modal>
</template>

<style lang="scss" scoped>
.signin-modal {
    .modal-header {
        border: none;
    }
}
div[data-name="form-title"] {
    * {
        text-align: center;
    }
    h2 {
        font-size: 1.2rem;
        font-weight: bold;
    }
    p {
        font-size: 1rem;
    }
}
div[data-name="form-signin"] {
    text-align: right;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { ModalChildMixin } from '@/mixins/ModalChild.mixin';
import { UserSignupData } from '@/interfaces/User.interface';
import APIAuth from '@/api/APIAuth';
import SignupForm from '@/components/forms/Signup.form.vue';

@Component({
    name: 'SignupModal',
    mixins: [ ModalChildMixin ],
    components: { SignupForm },
})
class SignupModal extends Vue {
    isBusy: boolean;

    constructor () {
        super();

        this.isBusy = false;
    }

    @State('auth') AuthState;
    @Action('setToken') setToken;
    @Action('setUserByAPI') setUserByAPI;

    async postData (data: UserSignupData) {
        this.isBusy = true;
        try {
            const signupResponse = await APIAuth.signup(data);
            this.setToken({
                accessToken: signupResponse.result.access_token,
                refreshToken: signupResponse.result.refresh_token,
            });
            this.setUserByAPI().then(res => {
                this.$router.push({ name: 'auth-grade' });
                this.isBusy = false;
            });
        }
        catch (e) {
            this.isBusy = false;
        }
    }
}
export default SignupModal;
</script>
