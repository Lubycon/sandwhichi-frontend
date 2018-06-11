<template>
<b-form-row class="project-form" data-name="project-open-chat">
    <b-col cols="12">
        <b-form-group
        label="기본 계정메일주소"
        :state="!errors.has('email')">
            <b-form-input
                type="text"
                name="email"
                v-validate="'required|email'"
                placeholder="기본 계정 메일주소"
                v-model="email">
            </b-form-input>
            <b-form-invalid-feedback>{{ errors.first('email') }}</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group :state="!errors.has('openChat')">
            <b-form-input
                type="text"
                name="openChat"
                v-validate="'required|alpha'"
                placeholder="카카오톡 오픈채팅 주소"
                v-model="openChatAddress">
            </b-form-input>
            <b-form-invalid-feedback>{{ errors.first('openChat') }}</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group :state="!errors.has('kakaoId')">
            <b-form-input
                type="text"
                name="kakaoId"
                v-validate="'required|alpha'"
                placeholder="개인 카카오톡 아이디"
                v-model="kakaoId">
            </b-form-input>
            <b-form-invalid-feedback>{{ errors.first('kakaoId') }}</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group :state="!errors.has('facebookId')">
            <b-form-input
                type="text"
                name="facebookId"
                v-validate="'required|alpha'"
                placeholder="페이스북 계정 아이디"
                v-model="facebookId">
            </b-form-input>
            <b-form-invalid-feedback>{{ errors.first('facebookId') }}</b-form-invalid-feedback>
        </b-form-group>
    </b-col>
</b-form-row>
</template>
<style lang="scss" scoped>

</style>
<script lang="ts">
    /**
     * @class ProjectOpenChat
     * @extends Vue
     * @implements FormComponent
     */
    import { Vue, Component } from 'vue-property-decorator';
    import { FormComponent } from '@/interfaces/Form.interface';

    @Component({
        name: 'ProjectOpenChat',
    })
    class ProjectOpenChatForm extends Vue implements FormComponent {
        email: string;
        openChatAddress: string;
        kakaoId: string;
        facebookId: string;

        constructor () {
            super();
            this.email = '';
            this.openChatAddress = '';
            this.kakaoId = '';
            this.facebookId = '';
        }

        async validate (): Promise<boolean> {
            const emailValidate = await this.$validator.validate('email', this.email);
            const chatAddressValidate = await this.$validator.validate('openChat', this.openChatAddress);
            const kakaoValidate = await this.$validator.validate('kakaoId', this.kakaoId);
            const facebookValidate = await this.$validator.validate('facebookId', this.facebookId);
            const result = emailValidate && chatAddressValidate && kakaoValidate && facebookValidate;

            this.$emit('validate', result);
            return result;
        }
    }
    export default ProjectOpenChatForm;
</script>
