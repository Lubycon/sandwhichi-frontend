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
                @change="onChangeEmailHost"
                tabindex="-1">
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
    <b-form-text
        v-if="!state"
        text-variant="invalid">
        {{ feedbackMsg }}
    </b-form-text>
</b-form-group>
</template>

<style lang="scss" scoped>
div[data-name="email"] {
    padding-right: 0;
}
</style>

<script lang="ts">
/**
 * @class EmailForm
 * @extends Vue
 * @member { any } $refs from Vue
 * @member { string } email
 * @member { EmailHost[] } emailHostList
 * @member { EmailHost } selectedEmailHost
 */
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { EmailHost } from '@/interfaces/Form.interface';
import { AUTOCOMPLATE_EMAIL_HOSTS } from '@/constants/form.constant';

@Component({
    name: 'EmailForm',
})
class EmailForm extends Vue {
    $refs: {
        email: any,
    }
    email: string;
    emailHostList: EmailHost[];
    selectedEmailHost: EmailHost;

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

    /**
     * @event onChangeEmail
     * @desc 이메일이 변경되었을 때 부모로 부터 v-model에 바인딩 된 값을 업데이트 한다
     */
    @Watch('email')
    onChangeEmail () {
        this.$emit('input', this.email);
    }

    /**
     * @method onChangeEmailHost
     * @desc selectedEmailHost값이 변경될 때 이메일 값을 조합한다
     * 만약 직접입력이 선택되었다면 텍스트 인풋 박스르 포커스한다
     */
    onChangeEmailHost (value: EmailHost): void {
        const email = this.email.split('@');
        this.$set(this, 'email', `${email[0]}@${value.host}`);
        this.$refs.email.$el.focus();
    }

    /**
     * @method onDetectAtKey
     * @desc 유저가 @키를 입력했을 경우 selectedEmailHost값을 직접입력으로 바꾼다
     */
    onDetectAtKey (e): void {
        if (e.keyCode === 50 && e.shiftKey) {
            const hostlist = this.emailHostList;
            this.$set(this, 'selectedEmailHost', hostlist[hostlist.length - 1]);
        }
    }
}
export default EmailForm;
</script>
