<template>
    <div class="question-answer-form">
        <b-form-select
            v-model="selectedQuestion"
            data-name="form-unit"
            :state="!errors.has('answer')">
            <option
                v-for="(question, index) in questions"
                :key="index"
                :value="question">
                {{ question.text }}
            </option>
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
        Answer,
        FormComponent
    } from '@/interfaces/Form.interface';

    @Component({
        name: 'QuestionAnswerForm',
    })
    class QuestionAnswerForm extends Vue implements FormComponent {
        selectedQuestion: Question;
        questionString: string;
        answerString: string;

        constructor () {
            super();

            this.selectedQuestion = this.questions[0];
            this.questionString = '';
            this.answerString = '';
        }

        @Prop({ required: true })
        questions: Question[];

        get placeholder (): string {
            if (this.selectedQuestion) {
                return this.selectedQuestion.text;
            }
            else {
                return '자유롭게 설명해주세요';
            }
        }

        get answer (): Answer {
            const question = this.selectedQuestion.text;
            const answer = {
                question,
                answer: this.answerString,
            };

            return answer;
        }

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
