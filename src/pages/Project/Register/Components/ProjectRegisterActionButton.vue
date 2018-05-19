<template>
    <div class="project-register-action-button-wrapper">
        <slot></slot>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    @Component({
        name: 'ProjectRegisterActionButton',
    })
    class ProjectRegisterActionButton extends Vue {
    }
    export default ProjectRegisterActionButton;

</script>
<style lang="scss" scoped>
    .project-register-action-button-wrapper{
        overflow: hidden;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 49px;
        z-index: 100;
        border-top: 1px solid #ccc;
        button, a{
            display: block;
            width: 100%;
            height: 100%;
            border: 0;
            font-size: 14px;
            line-height: 48px;
            text-align: center;
            &:focus, &:active{
                outline: 0;
                border: 0;
            }
            &.is-previous{
                background-color: #fff;
                color: #999;
            }
            &.is-next{
                background-color: #52bad5;
                color: #fff;
            }
            &.is-half{
                float: left;
                width: 50%;
            }
        }
    }
</style>
