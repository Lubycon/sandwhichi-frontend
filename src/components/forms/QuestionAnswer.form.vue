<template>
    <div class="question-answer-form">
        <b-form-select
            v-model="selectedQuestion"
            :options="questions"
            data-name="form-unit"
            :state="!errors.has('answer')">
        </b-form-select>
        <b-form-textarea
            v-model="answerString"
            name="answer"
            :placeholder="placeholder"
            :rows="6"
            :resize="false"
            :state="!errors.has('answer')"
            data-name="form-unit"
            v-validate="'required|max:500'">
        </b-form-textarea>
    </div>
</template>

<style lang="scss" scoped>
*[data-name="form-unit"] {
    margin-bottom: 1rem;
    &:last-child {
        margin-bottom: 0;
    }
}
</style>

<script lang="ts">
    /**
     * @class QuestionAnswerForm
     * @extends Vue
     * @implements FormComponent
     */
    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
    import {
        Question,
        FormComponent
    } from '@/interfaces/Form.interface';

    @Component({
        name: 'QuestionAnswerForm',
    })
    class QuestionAnswerForm extends Vue implements FormComponent {
        selectedQuestion: number;
        questionString: string;
        answerString: string;

        constructor () {
            super();

            this.selectedQuestion = 1;
            this.questionString = '';
            this.answerString = '';
        }

        @Prop({ required: true })
        questions: Question[];

        get placeholder (): string {
            const selectedIndex = this.questions.findIndex(v => v.value === this.selectedQuestion);

            return selectedIndex > -1 ? this.questions[selectedIndex].text : '';
        }
        //
        // get answer (): Answer {
        //     const question = this.selectedQuestion.text;
        //     const answer = {
        //         question,
        //         answer: this.answerString,
        //     };
        //
        //     return answer;
        // }

        @Watch('answer')
        async onChangeAnswer (answer) {
            const validate = await this.validate();
            if (!validate) {
                answer.answer = '';
            }
            this.$emit('input', answer);
        }

        validate (): Promise<any> {
            console.log('validation');
            return this.$validator.validate('answer', this.answerString);
        }
    }
    export default QuestionAnswerForm;
</script>
