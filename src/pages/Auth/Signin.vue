<template>
<b-container>
    <b-row>
        <b-col cols="12" sm="8" md="6" lg="4" class="card card--center-form">
            <div class="logo">
                <router-link :to="{ name: 'home' }">
                    <img :src="logo" alt="샌드위치" title="샌드위치 로고">
                </router-link>
            </div>
            <div class="card-body">
                <signin-form :is-busy="isBusy" @submit="postData"></signin-form>
            </div>
        </b-col>
    </b-row>
</b-container>
</template>

<style lang="scss">
@import 'src/styles/utils/__module__';

.logo {
    text-align: center;
    img {
        width: 250px;
        margin-bottom: 10px;
        @include mq('xs') {
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
    @include mq('xs') {
        font-size: 14px;
    }
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { VERTICAL_LOGO } from '@/constants';
import { UserSigninData } from '@/interfaces/User.interface';
import APIAuth from '@/api/APIAuth';
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

        this.logo = VERTICAL_LOGO;
        this.isBusy = false;
    }

    @Action('setToken') setToken;
    @Action('setUserByAPI') setUserByAPI;

    async postData (signinData: UserSigninData): Promise<any> {
        this.isBusy = true;
        try {
            const signinResponse = await APIAuth.signin(signinData);
            this.setToken({
                accessToken: signinResponse.result.access_token,
                refreshToken: signinResponse.result.refresh_token,
            });
            this.setUserByAPI().then(
                res => this.authResolve(),
                err => this.authReject(err)
            );
        }
        catch (e) {
            this.authReject(e);
        }
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
