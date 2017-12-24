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
        font-size: 20px;
        font-weight: bold;
    }
    p {
        font-size: 14px;
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
import APIService from '@/services/API.service';
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

    postData (authData: UserSignupData): void {
        this.isBusy = true;
        APIService.resource('users.signup').post(authData)
        .then(res => {
            this.setToken({
                accessToken: res.result.access_token,
                refreshToken: res.result.refresh_token,
            });
            this.setUserByAPI().then(res => {
                this.$router.push({ name: 'auth-grade' });
                this.isBusy = false;
            });
        }, err => {
            if (err) {
                alert(`[Error - ${err.status}_${err.data.status.code}] ${err.data.status.msg}`);
            }
            else {
                alert(`[Error - ${err.status}] Unknown Error`);
            }
            this.isBusy = false;
        });
    }
}
export default SignupModal;
</script>
