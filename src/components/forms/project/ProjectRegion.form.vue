<template>
<b-form-row class="project-form" data-name="project-region">
    <b-col cols="12">
        <b-form-group
            label="지역 1">
            <b-form-select
                v-model="region1"
                :options="regionOptions">
            </b-form-select>
        </b-form-group>
        <b-form-group
            label="지역 2">
            <b-form-select
                v-model="region2"
                :options="regionOptions">
            </b-form-select>
        </b-form-group>
    </b-col>
</b-form-row>
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
        region1: string;
        region2: string;
        regionOptions: Array<Object> = [
            { value: 'seoul', text: '서울' },
            { value: 'gyeonggi', text: '경기도' }
        ];
        validate (): void {}
    }

    export default ProjectRegionForm;
</script>
<style lang="scss" scoped>

</style>
