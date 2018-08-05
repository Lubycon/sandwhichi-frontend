<template>
<div class="account-form">
    <b-form @submit.prevent="submit" autocomplete="off" novalidate>
        <b-form-group
            :key="opt.question_id"
            :label="opt.question.ko"
            v-for="(opt,idx) in options"
        >
            <b-form-select
                :options="opt.answer"
                value-field="id"
                text-field="ko"
                v-model="signdropData.answerIds[idx]"
            />
        </b-form-group>
        <b-button type="submit" class="btn">Sign drop</b-button>
    </b-form>
</div>
</template>

<style lang="scss">

</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { UserSigndropData } from '@/interfaces/User.interface';
import APIAuth from '@/api/APIAuth';

@Component({
    name: 'SigndropForm',
})
class SigndropForm extends Vue {
    options: any[];
    signdropData: UserSigndropData;

    constructor () {
        super();

        this.options = [];
        this.signdropData = {
            answerIds: [],
        };
    }

    async fetchOptions (): Promise<any> {
        try {
            const surveyResponse = await APIAuth.getSigndropSurvey();
            this.$set(this, 'options', surveyResponse.results);
            return surveyResponse;
        }
        catch (e) {}
    }

    submit (): void {
        this.$emit('submit', this.signdropData);
    }

    created () {
        this.fetchOptions();
    }
}
export default SigndropForm;
</script>
