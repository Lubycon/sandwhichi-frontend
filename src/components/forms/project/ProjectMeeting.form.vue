<template>
    <div>Meeting</div>
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

    @Component({
        name: 'ProjectMeetingForm',
    })
    class ProjectMeetingForm extends Vue implements FormComponent {
        validate (): void {

        }
    }
    export default ProjectMeetingForm;
</script>

