<template>
<div class="container row">
    <div class="col-12 col-md-6 col-lg-4 card card--center-form">
        <div data-section="form-desc">
            <h1>Please enter your password</h1>
        </div>
        <b-form @submit.prevent="submit">
            <b-form-group>
                <b-form-input
                    type="password"
                    placeholder="Password"
                    v-model="password"
                />
            </b-form-group>
            <b-button type="submit">
                <span v-show="!isBusy">Next</span>
                <i v-show="isBusy" class="loading-ico pxs-spinner-1 spin"></i>
            </b-button>
        </b-form>
    </div>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { GET_MY_USER } from '@/stores/auth/config';
import { UserSigninData } from '@/interfaces/User.interface';
import APIAuth from '@/api/APIAuth';

@Component({
    name: 'AuthPassword',
})
class AuthPassword extends Vue {
    password: string;
    isBusy: boolean;

    constructor () {
        super();

        this.password = null;
        this.isBusy = false;
    }

    @Getter(GET_MY_USER) me;

    async submit (): Promise<any> {
        const data: UserSigninData = {
            email: this.me.email,
            password: this.password,
        };

        this.isBusy = true;

        try {
            const checkPasswordResponse = await this.checkPassword(data);
            if (checkPasswordResponse.results.validity) {
                this.createToken();
            }
            else {
                this.rejectHandler('Please make sure your password!');
            }
        }
        catch (e) {
            this.rejectHandler('Please make sure your password!');
        }
    }

    checkPassword (data): Promise<any> {
        return APIAuth.checkPassword(data);
    }

    async createToken (): Promise<any> {
        try {
            const tokenResponse = await APIAuth.createPasswordToken();
            this.$router.push({
                name: 'user-setting-password',
                params: { code: tokenResponse.results.token },
            });
        }
        catch (e) {
            this.rejectHandler('[Err] Token generating has been failed');
        }
    }

    rejectHandler (msg): void {
        this.isBusy = false;
        alert(msg);
    }
}
export default AuthPassword;
</script>
