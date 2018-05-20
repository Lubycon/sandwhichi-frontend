<template>
    <b-container class="create-project">
        <project-regist-formset></project-regist-formset>
    </b-container>
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
    import ProjectRegistFormset from '@/components/forms/project/ProjectRegist.formset.vue';

    @Component({
        name: 'CreateProject',
        components: {
            ProjectRegistFormset,
        },
    })
    class CreateProject extends Vue {}
    export default CreateProject;
</script>
