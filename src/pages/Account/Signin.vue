<template>
<div class="container row">
    <div class="col-12 col-md-6 col-lg-4 card card--center-form">
        <div class="logo">
            <router-link :to="{ name: 'home' }">
                <img :src="logo" alt="pixelstairs-logo" title="pixelstairs-logo">
                <p>Connect your creativity with the World!</p>
            </router-link>
        </div>

        <div class="card-body">
            <signin-form :is-busy="isBusy" @submit="postData"></signin-form>
        </div>
        <router-link
            class="btn-link"
            :to="{ name: 'find-password' }"
        >
            Find password
        </router-link>
    </div>
</div>
</template>

<style lang="scss">
@import 'src/styles/utils/__module__';

.logo {
    text-align: center;
    img[title="pixelstairs-logo"] {
        width: 250px;
        margin-bottom: 10px;
        @include mq('sm') {
            width: 150px;
        }
    }
}

.card--center-form {
    input {
        font-size: 14px;
        padding: 0.75rem 1rem;
        background: transparent;
    }
}

.btn-link {
    padding: $card-padding;
    color: $grey-700;
    text-align: right;
    @include mq('sm') {
        font-size: 14px;
    }
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { LOGO } from '@/constants';
import { UserSigninData } from '@/interfaces/User.interface';
import APIService from '@/services/API.service';
import SigninForm from '@/components/forms/Signin.form.vue';

@Component({
    name: 'Signin',
    components: { SigninForm },
})
class Signin extends Vue {
    logo: string;
    isBusy: boolean;

    constructor () {
        super();

        this.logo = LOGO;
        this.isBusy = false;
    }

    @Action('setToken') setToken;
    @Action('setUserByAPI') setUserByAPI;

    postData (signinData: UserSigninData): void {
        this.isBusy = true;
        APIService.resource('users.signin').post(signinData)
        .then(res => {
            this.setToken({
                accessToken: res.result.access_token,
                refreshToken: res.result.refresh_token,
            });
            this.setUserByAPI()
            .then(res => {
                this.authResolve();
            }, err => {
                if (err) {
                    this.authReject(err);
                }
                else {
                    this.authReject();
                }
            });
        }, err => {
            if (err) {
                this.authReject(err);
            }
            else {
                this.authReject();
            }
        });
    }

    authResolve (): void {
        if (this.$route.query.redirect) {
            this.$router.push({ path: this.$route.query.redirect });
        }
        else {
            this.$router.push({ name: 'home' });
        }
        this.isBusy = false;
    }

    authReject (err?): void {
        if (err && err.data) {
            if (err.data.status.code === '0061') {
                alert('이메일 또는 패스워드를 다시 한번 확인해주세요');
            }
            else {
                alert('알 수 없는 에러');
            }
        }
        else {
            alert('알 수 없는 에러');
        }
        this.isBusy = false;
    }
}
export default Signin;
</script>
