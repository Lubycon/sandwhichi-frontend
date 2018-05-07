<template>
<div class="project-regist-form">
    <b-row tag="header" data-name="progress-bar">
        <progress-bar
            :max="maxPageIndex"
            :value="pageIndex">
        </progress-bar>
    </b-row>
    <b-row>

    </b-row>
    <b-row tag="footer" data-name="control-panel">
        <button @click="prevStep">-</button>
        <button @click="nextStep">+</button>
    </b-row>
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
    import ProjectRegionForm from '@/components/forms/project/ProjectRegion.form.vue';
    import ProjectScheduleForm from '@/components/forms/project/ProjectSchedule.form.vue';

    @Component({
        name: 'ProjectRegistForm',
        components: {
            ProgressBar,
            ProjectInfoForm,
            ProjectRegionForm,
            ProjectScheduleForm,
        },
    })
    class ProjectRegistForm extends Vue {
        pageIndex: number = 0;
        maxPageIndex: number = 5;

        nextStep (): void {
            const maxPageIndex = this.maxPageIndex;
            let pageIndex = this.pageIndex;
            if (pageIndex < maxPageIndex) {
                pageIndex++;
                this.$set(this, 'pageIndex', pageIndex);
            }
        }

        prevStep (): void {
            let pageIndex = this.pageIndex;
            if (pageIndex > 0) {
                pageIndex--;
                this.$set(this, 'pageIndex', pageIndex);
            }
        }
    }
    export default ProjectRegistForm;
</script>
