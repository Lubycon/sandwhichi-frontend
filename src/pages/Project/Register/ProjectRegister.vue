<template>
    <div>
        <!-- Progress bar 영역 -->
        <progress-bar :value="50"></progress-bar>
        <!--// Progress bar 영역 -->
        <b-container fluid v-cloak>
            <b-row>
                <b-col>
                    <router-view></router-view>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<style lang="scss" scoped>
    @import 'src/styles/utils/__module__';
</style>

<script lang="ts">
    /**
     * @class ProjectRegister
     * @extends Vue
     */
    import { Vue, Component } from 'vue-property-decorator';
    import ProgressBar from '@/components/utils/ProgressBar.vue';

    @Component({
        name: 'ProjectRegister',
        components: {
            ProgressBar,
        },
    })
    class ProjectRegister extends Vue {}
    export default ProjectRegister;
</script>
