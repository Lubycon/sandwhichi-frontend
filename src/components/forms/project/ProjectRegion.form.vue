<template>

</template>
<script lang="ts">
    /**
     * @class ProjectRegionForm
     * @extends Vue
     * @implements FormComponent
     */
    import { Vue, Component } from 'vue-property-decorator';
    import { FormComponent } from '@/interfaces/Form.interface';

    @Component({
        name: 'ProjectRegionForm',
    })
    class ProjectRegionForm extends Vue implements FormComponent {
        validate (): void {}
    }

    export default ProjectRegionForm;
</script>
<style lang="scss" scoped>

</style>
