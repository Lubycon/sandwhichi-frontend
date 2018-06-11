<template>
<b-form-row class="project-form" data-name="project-complete">
    <b-col cols="12">
        <i class="far fa-check-circle"></i>
        <p>이제 더 자세한 정보를 채워서<br/>멤버들을 모집해 볼까요?</p>
        <router-link class="btn btn-primary" to="#none">프로젝트 관리 페이지</router-link>
        <router-link class="btn btn-secondary-outline" to="#none">프로젝트 디테일 페이지</router-link>
    </b-col>
</b-form-row>
</template>
<style lang="scss" scoped>
div[data-name="project-complete"] {
    padding-top: 78px;
    text-align: center;
    .fa-check-circle {
        margin-bottom: 32px;
        font-size: 82px;
    }
    p {
        margin-bottom: 72px;
        font-size: 16px;
        line-height: 24px;
    }
    a {
        width: 100%;
        &.btn-primary{
            margin-bottom: 12px;
        }
    }
}
</style>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';

    @Component({
        name: 'ProjectCompleteForm',
    })

    class ProjectCompleteForm extends Vue {
    }
    export default ProjectCompleteForm;

</script>
