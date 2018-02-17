<template>
<b-form-group label="이메일">
    <b-row>
        <b-col cols="6" data-name="email-account">
            <b-form-input
                ref="emailAccount"
                name="emailAccount"
                v-model.trim="emailAccount"
                placeholder="이메일 입력"
                x-autocompletetype="off"
                autocompletetype="off"
                autocomplete="off"
                autocorrect="off"
                spellcheck="off"
                autocapitalize="off"
                :state="!errors.has('email')"/>
        </b-col>
        <b-col cols="6">
            <b-form-select
                ref="emailHost"
                v-model="emailHost"
                :state="!errors.has('email')">
                <option
                    v-for="(item, index) in emailHostList"
                    :key="index"
                    :value="item">
                    {{ item.isDirectInput ? item.name : item.host }}
                </option>
            </b-form-select>
        </b-col>
    </b-row>
    <b-form-text v-if="errors.has('email')">
        {{ errors.first('email') }}
    </b-form-text>
</b-form-group>
</template>

<style lang="scss" scoped>
@import 'src/styles/utils/__module__';

div[data-name="email-account"] {
    &::before {
        position: absolute;
        content: '@';
        top: 50%;
        transform: translate(50%, -50%);
        right: 0;
        color: $grey600;
    }
}
</style>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { isExistUserMixin } from '@/mixins/IsExistUser.mixin';
import { EMAIL_HOST } from '@/interfaces/Form.interface';
import { AUTOCOMPLATE_EMAIL_HOSTS } from '@/constants/form.constant';

@Component({
    name: 'EmailForm',
    mixins: [ isExistUserMixin ],
})
class EmailForm extends Vue {
    emailAccount: string;
    emailDirectInput: string;
    emailHost: EMAIL_HOST;
    emailHostList: EMAIL_HOST[];

    constructor () {
        super();
        this.emailAccount = null;
        this.emailDirectInput = null;
        this.emailHost = AUTOCOMPLATE_EMAIL_HOSTS[0];
        this.emailHostList = AUTOCOMPLATE_EMAIL_HOSTS;
    }

    get email () {
        const email = `${this.emailAccount || ''}@${this.emailHost.host || ''}`;
        return email;
    }

    @Watch('email')
    onChangeEmail () {
        // @TODO
        // debounce 달아야함
        // 2018.02.17 - Evan
        this.validateEmail();
    }

    async validateEmail (): Promise<boolean> {
        const email = this.email;
        try {
            const validate = await this.$validator.validate('email', email);
            if (validate) {
                this.$emit('input', this.email);
            }
            else {
                this.$emit('input', null);
            }
            return validate;
        }
        catch (e) {
            this.$emit('input', null);
            throw new Error(e);
        }
    }

    created () {
        this.$validator.attach('email', 'required|email|avoidExistEmail');
    }
}
export default EmailForm;
</script>
