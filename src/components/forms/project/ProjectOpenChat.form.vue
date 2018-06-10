<template>
<b-form-row class="project-form" data-name="project-open-chat">
    <b-col cols="12">
        <b-form-group
        label="기본 계정메일주소">
            <b-form-input
                type="text"
                name="email"
                placeholder="기본 계정 메일주소"
                v-model="email">
            </b-form-input>
        </b-form-group>
        <b-form-group>
            <b-form-input
                type="text"
                name="openChat"
                placeholder="카카오톡 오픈채팅 주소"
                v-model="openChatAddress">
            </b-form-input>
        </b-form-group>
        <b-form-group>
            <b-form-input
                type="text"
                name="kakaoId"
                placeholder="개인 카카오톡 아이디"
                v-model="kakaoId">
            </b-form-input>
        </b-form-group>
        <b-form-group>
            <b-form-input
                type="text"
                name="facebookId"
                placeholder="페이스북 계정 아이디"
                v-model="facebookId">
            </b-form-input>
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
        validate (): void {
            // TODO validation 추가
        }
    }
    export default ProjectOpenChatForm;
</script>
