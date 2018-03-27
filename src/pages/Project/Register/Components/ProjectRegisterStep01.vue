<template>
    <div class="project-register-step01-wrapper">
        <form>
            <!-- 프로젝트 썸네일 등록 폼 -->
            <b-form-group label="프로젝트 썸네일">
                <div class="project-register-step01-wrapper--image-wrapper">
                    <span>+</span>
                    <div>
                        <b-form-file></b-form-file>
                    </div>
                </div>
            </b-form-group>
            <!--// 프로젝트 썸네일 등록 폼 -->

            <!-- 프로젝트 이름 등록 폼 -->
            <b-form-group label="프로젝트 이름">
                <b-form-input type="text"
                              name="projectName"
                              placeholder="멋진 이름이 하나 정돈 필요할 것 같아요"/>
            </b-form-group>
            <!--// 프로젝트 이름 등록 폼 -->
            <!-- 프로젝트 이름 등록 폼 -->
            <b-form-group label="프로젝트 내용">
                <b-form-select v-model="selectedCategory" :options="projectCategory"></b-form-select>
            </b-form-group>
            <!--// 프로젝트 이름 등록 폼 -->
        </form>
    </div>
</template>
<style lang="scss" scoped>
    .project-register-step01-wrapper{
        .project-register-step01-wrapper--image-wrapper{
            overflow: hidden;
            position: relative;
            width: 124px;
            height: 124px;
            border: 1px solid #ccc;
            > span{
                position: absolute;
                top: 50%;
                left: 50%;
                margin: -14px 0 0 -8px;
                font-size: 28px;
                line-height: 28px;
                color: #cccccc;
            }
            > div{
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0.01;
                font-size: 100px;
            }
        }
    }
</style>
<script lang="ts">
    /**
     * @class ProjectRegisterStep01.vue
     * @extends Vue
     */
    import { Vue, Component } from 'vue-property-decorator';
    import ProgressBar from '@/components/utils/ProgressBar.vue';

    @Component({
        name: 'ProjectRegisterStep01',
        components: {
            ProgressBar,
        },
    })
    class ProjectRegisterStep01 extends Vue {
        selectedCategory: string = '';
        projectCategory: Array<string> = ['test', 'test2', 'test3'];
    }
    export default ProjectRegisterStep01;
</script>
