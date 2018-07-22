<template>
<b-form-row class="project-form" data-name="project-region">
    <b-col cols="12">
        <b-form-group
            label="지역 1"
            :state="!errors.has('province')">
            <b-form-select
                v-model="province"
                name="province"
                v-validate="'required'"
                :options="provinceOptions">
            </b-form-select>
            <b-form-invalid-feedback>{{ errors.first('province') }}</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
            v-show="province"
            label="지역 2"
            :state="!errors.has('city')">
            <b-form-select
                v-model="city"
                name="city"
                v-validate="'required'"
                :options="cityOptions">
            </b-form-select>
            <b-form-invalid-feedback>{{ errors.first('city') }}</b-form-invalid-feedback>
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
    import { Vue, Component, Watch } from 'vue-property-decorator';
    import { FormComponent } from '@/interfaces/Form.interface';
    import APIAddress from '@/api/APIAddress';

    @Component({
        name: 'ProjectRegionForm',
    })
    class ProjectRegionForm extends Vue implements FormComponent {
        city: string;
        cityOptions: Object[];
        province: string;
        provinceOptions: Object[];

        constructor () {
            super();
            this.city = '';
            this.cityOptions = [];
            this.province = '';
            this.provinceOptions = [];
        }
        @Watch('province')
        fetchCity (value: string) {
            APIAddress.fetchProvinceAddress(value)
                .then(provinceAddress => {
                    this.cityOptions = provinceAddress;
                });
        }

        created () {
            APIAddress.fetchCityAddress()
                .then(cityAddress => {
                    this.provinceOptions = cityAddress;
                });
        }
        setData (): void {
            const cityAddress = this.city;
            const provinceAddress = this.province;

            this.$emit('setData', { cityAddress, provinceAddress });
        }

        async validate (): Promise<boolean> {
            const provinceValidate = await this.$validator.validate('province', this.province);
            const cityValidate = await this.$validator.validate('city', this.city);
            const result = provinceValidate && cityValidate;

            this.$emit('validate', result);
            return result;
        }
    }

    export default ProjectRegionForm;
</script>
<style lang="scss" scoped>

</style>
