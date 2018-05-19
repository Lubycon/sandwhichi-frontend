<template>
    <div class="question-answer-formset">
        <ul data-name="answer-forms">
            <li v-for="index in answerCount">
                <question-answer-form
                    v-model="answers[index - 1]"
                    :questions="questions">
                </question-answer-form>
            </li>
        </ul>
        <b-row data-name="control-buttons">
            <b-col v-show="answerCount > 1">
                <b-button
                    variant="outline-secondary"
                    @click="removeAnswer">
                    - 질문 제거
                </b-button>
            </b-col>
            <b-col v-show="answerCount < maxAnswerCount">
                <b-button
                    variant="outline-secondary"
                    @click="addAnswer">
                    + 질문 추가
                </b-button>
            </b-col>
        </b-row>
    </div>
</template>

<style lang="scss" scoped>
    @import 'src/styles/utils/__module__';
    ul[data-name="answer-forms"] {
        li {
            margin-bottom: 1rem;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
    div.row[data-name="control-buttons"] {
        button.btn {
            width: 100%;
            border-color: $grey400;
            color: $grey800;
        }
    }
</style>

<script lang="ts">
    /**
     * @class QuestionAnswerFormset
     * @extends Vue
     * @implements FormComponent
     */
    import { Vue, Component } from 'vue-property-decorator';
    import {
        Question,
        Answer,
        FormComponent
    } from '@/interfaces/Form.interface';
    import QuestionAnswerForm from '@/components/forms/QuestionAnswer.form.vue';

    @Component({
        name: 'QuestionAnswerFormset',
        components: { QuestionAnswerForm },
    })
    class QuestionAnswerFormset extends Vue implements FormComponent {
        maxAnswerCount: number;
        answerCount: number;
        answers: Answer[];
        questions: Question[];

        constructor () {
            super();

            this.maxAnswerCount = 4;
            this.answerCount = 1;
            this.answers = [];
            this.questions = [{
                text: '어떤 주제를 다루는 프로젝트 인가요?',
            }, {
                text: '어떤 사람들이 필요한지 궁금해요',
            }, {
                text: '이 프로젝트를 한마디로 표현한다면?',
            }];
        }

        addAnswer (): void {
            if (this.answerCount < this.maxAnswerCount) {
                this.answerCount++;
            }
        }

        removeAnswer (): void {
            if (this.answerCount > 1) {
                this.answerCount--;
                this.answers.pop();
            }
        }

        validate () {}
    }
    export default QuestionAnswerFormset;
</script>