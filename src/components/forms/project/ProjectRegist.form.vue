<template>
<div class="project-regist-form">

</div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    /**
     * @class ProjectRegistForm
     * @extends Vue
     */
    import { Vue, Component } from 'vue-property-decorator';
    import ProgressBar from '@/components/utils/ProgressBar.vue';
    import ProjectInfoForm from '@/components/forms/project/ProjectInfo.form.vue';

    @Component({
        name: 'ProjectRegistForm',
        components: {
            ProgressBar,
            ProjectInfoForm,
        },
    })
    class ProjectRegistForm extends Vue {

    }
    export default ProjectRegistForm;
</script>
