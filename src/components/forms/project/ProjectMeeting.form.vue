<template>
  
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    /**
     * @class ProjectMeetingForm
     * @extends Vue
     * @implements FormComponent
     */
    import { Vue, Component } from 'vue-property-decorator';
    import { FormComponent } from '@/interfaces/Form.interface';
    import ActionButton from '@/components/buttons/ProjectRegisterActionButton.vue';

    type IprojectCategoryOption = {
        value: number,
        text: string
    };
    
    @Component({
        name: 'ProjectMeetingForm',
        components: {
            ActionButton,
        },
    })
    class ProjectMeetingForm extends Vue implements FormComponent {
        moveNextStep (): void {
            // TODO: 다음 스텝으로 이용하는 기능 추가
            console.log('다음 스텝으로 넘어가는 기능 추가');
        }

        validate (): void {
            
        }
    }
    export default ProjectMeetingForm;
</script>

