<template>
    <div class="create-project">
        <project-regist-form></project-regist-form>
    </div>
</template>

<style lang="scss" scoped>
    /*@import 'src/styles/utils/__module__';*/
</style>

<script lang="ts">
    /**
     * @class CreateProject
     * @extends Vue
     */
    import { Vue, Component } from 'vue-property-decorator';
    import ProjectRegistForm from '@/components/forms/project/ProjectRegist.form.vue';

    @Component({
        name: 'CreateProject',
        components: {
            ProjectRegistForm,
        },
    })
    class CreateProject extends Vue {}
    export default CreateProject;
</script>
