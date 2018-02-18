<template>
<b-form-group label="이메일">
    <b-row>
        <b-col cols="7" data-name="email">
            <b-form-input
                ref="email"
                name="email"
                type="email"
                v-model.trim="email"
                placeholder="이메일 입력"
                x-autocompletetype="off"
                autocompletetype="off"
                autocomplete="off"
                autocorrect="off"
                spellcheck="off"
                autocapitalize="off"
                :state="state"
                @keyup.native="onDetectAtKey"/>
        </b-col>
        <b-col cols="5">
            <b-form-select
                v-model="selectedEmailHost"
                @change="onChangeEmailHost">
                <template slot="first">
                    <option :value="null" disabled>계정 선택</option>
                </template>
                <option
                    v-for="(item, index) in emailHostList"
                    :key="index"
                    :value="item">
                    {{ item.name }}
                </option>
            </b-form-select>
        </b-col>
    </b-row>
    <b-form-text v-if="!state">{{ feedbackMsg }}</b-form-text>
</b-form-group>
</template>

<style lang="scss" scoped>
div[data-name="email"] {
    padding-right: 0;
}
</style>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { EMAIL_HOST } from '@/interfaces/Form.interface';
import { AUTOCOMPLATE_EMAIL_HOSTS } from '@/constants/form.constant';

@Component({
    name: 'EmailForm',
})
class EmailForm extends Vue {
    $refs: {
        email: any,
    }
    email: string;
    emailHostList: EMAIL_HOST[];
    selectedEmailHost: EMAIL_HOST;

    constructor () {
        super();
        this.email = '';
        this.emailHostList = AUTOCOMPLATE_EMAIL_HOSTS;
        this.selectedEmailHost = null;
    }

    @Prop({ default: true })
    state: boolean;

    @Prop({ default: '' })
    feedbackMsg: string;

    @Watch('email')
    onChangeEmail () {
        this.$emit('input', this.email);
    }

    onChangeEmailHost (value) {
        const email = this.email.split('@');
        this.$set(this, 'email', `${email[0]}@${value.host}`);
        this.$refs.email.$el.focus();
    }

    onDetectAtKey (e) {
        if (e.keyCode === 50 && e.shiftKey) {
            const hostlist = this.emailHostList;
            this.$set(this, 'selectedEmailHost', hostlist[hostlist.length - 1]);
        }
    }

    created () {
        this.$validator.attach('email', 'required|email|avoidExistEmail');
    }
}
export default EmailForm;
</script>
