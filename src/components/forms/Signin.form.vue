<template>
<div class="account-form">
    <div
        class="form-wrapper"
        :class="isExistUser ? 'right-form' : 'left-form'">
        <!-- Email Step -->
        <b-form @submit.prevent="checkEmail" novalidate>
            <b-form-input
                ref="emailInput"
                type="email"
                name="email"
                v-model.trim="email"
                placeholder="Email"
                v-validate="'required|email'"
                x-autocompletetype="off"
                autocompletetype="off"
                autocomplete="off"
                autocorrect="off"
                spellcheck="off"
                autocapitalize="off"
                :class="{ 'has-error': errors.has('email') }"/>
            <b-button
                type="submit"
                variant="primary">
                <span v-show="!isBusyIsExistUser">다음</span>
                <i v-show="isBusyIsExistUser" class="fas fa-spin fa-circle-notch"></i>
            </b-button>
            <div class="signup-field">
                <p>아직 회원이 아니신가요?</p>
                <router-link :to="{ name: 'signup' }">회원가입</router-link>
            </div>
        </b-form>
        <!-- /Email Step -->
        <!-- Password Step -->
        <b-form @submit.prevent="submit" novalidate>
            <h2 data-name="email">{{ email }}</h2>
            <b-form-input
                ref="passwordInput"
                type="password"
                name="password"
                v-model.trim="password"
                placeholder="Password"
                v-validate="'required'"
                :class="{ 'has-error': errors.has('password') }"/>
            <b-button
                type="submit"
                variant="primary">
                <span v-show="!isBusy">로그인</span>
                <i v-show="isBusy" class="fas fa-spin fa-circle-notch"></i>
            </b-button>
            <div class="signup-field">
                <div>
                    <p>비밀번호를 잊으셨나요?</p>
                    <router-link :to="{ name: 'find-password' }">여기서 찾아보세요!</router-link>
                </div>
                <div>
                    <p>또는</p>
                    <router-link :to="{ name: 'signup' }">회원가입을 해보세요!</router-link>
                </div>
            </div>
        </b-form>
        <!-- /Password Step -->
    </div>
</div>
</template>

<style lang="scss" scoped>
@import 'src/styles/utils/__module__';

$margin: 10px;

.form-group {
    margin: 0;
}

.account-form {
    position: relative;
    overflow-x: hidden;

    .form-wrapper {
        width: 200%;
        transition: transform 0.4s ease-in;
        &.left-form {
            transform: translateX(0);
        }
        &.right-form {
            transform: translate(-50%);
        }
    }

    form {
        display: inline-block;
        width: 50%;
        vertical-align: top;
        padding: 0 20px;

        div.signup-field {
            text-align: center;
            p, a {
                display: inline-block;
            }
            p {
                margin-right: $margin;
            }
            a {
                text-decoration: underline;
            }
        }
        h2[data-name="email"] {
            text-align: center;
            font-size: $normal-font-size;
        }
    }
}

input[type="email"], input[type="password"] {
    margin-bottom: $margin;
}

button.btn[type="submit"] {
    i {
        color: $white;
    }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { isExistUserMixin } from '@/mixins/IsExistUser.mixin';

@Component({
    name: 'SigninForm',
    mixins: [ isExistUserMixin ],
})
class SigninForm extends Vue {
    $refs: {
        emailInput: Vue,
        passwordInput: Vue,
    }

    checkIsExistEmail: Function;

    email: string;
    isExistUser: boolean;
    isBusyIsExistUser: boolean;
    password: string;
    errors: any;

    constructor () {
        super();

        this.email = null;
        this.isExistUser = false;
        this.isBusyIsExistUser = false;
        this.password = null;
    }

    @Prop({ default: false })
    isBusy: boolean;

    async checkEmail (): Promise<boolean> {
        this.isBusyIsExistUser = true;
        try {
            const response = await this.checkIsExistEmail(this.email);
            this.isExistUser = response;
            this.isBusyIsExistUser = false;
            setTimeout(() => this.$refs.passwordInput.$el.focus(), 500);
            return response;
        }
        catch (e) {
            this.isBusyIsExistUser = false;
            throw new Error(e);
        }
    }

    submit (): void {
        this.$validator.validateAll();
        if (this.errors.any()) {
            alert(this.errors.items[0].msg);
        }
        else {
            this.$emit('submit', {
                email: this.email,
                password: this.password,
            });
        }
    }
}
export default SigninForm;
</script>
