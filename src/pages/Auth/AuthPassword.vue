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
import APIService from '@/services/API.service';

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

    @Getter('getAuthUser') me;

    submit (): void {
        let data: any = {
            email: this.me.email,
            password: this.password,
        };

        this.isBusy = true;
        this.checkPassword(data).then(res => {
            if (res.result.validity) {
                this.createToken();
            }
            else {
                this.rejectHandler('Please make sure your password!');
            }
        }, err => {
            if (err) {
                this.rejectHandler('Please make sure your password!');
            }
            else {
                // Do nothing
            }
        });
    }

    checkPassword (data): Promise<any> {
        return APIService.resource('certs.password.check').post(data);
    }

    createToken (): void {
        APIService.resource('users.pwd.token').post()
        .then(res => {
            this.$router.push({
                name: 'user-setting-password',
                params: { code: res.result.token },
            });
        }, err => {
            if (err) {
                this.rejectHandler('[Err] Token generating has been failed');
            }
        });
    }

    rejectHandler (msg): void {
        this.isBusy = false;
        alert(msg);
    }
}
export default AuthPassword;
</script>
