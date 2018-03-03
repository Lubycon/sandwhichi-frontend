<template>
<div>
    <b-form-checkbox
        data-name="check-all"
        @change="onChangeCheckAll">
        약관 전체 동의
    </b-form-checkbox>
    <ul>
        <li>
            <b-form-checkbox v-model="isCheckedPrivacyPolicy">개인정보처리방침</b-form-checkbox>
            <span data-name="doc-link">
                <router-link :to="{ name: 'terms-of-service' }" target="_blank">보기</router-link>
            </span>
        </li>
        <li>
            <b-form-checkbox v-model="isCheckedTerms">이용약관</b-form-checkbox>
            <span data-name="doc-link">
                <router-link :to="{ name: 'privacy-policy' }" target="_blank">보기</router-link>
            </span>
        </li>
        <li>
            <b-form-checkbox v-model="isCheckedSendEmail">이메일 수신 동의 (선택)</b-form-checkbox>
        </li>
    </ul>
</div>
</template>

<style lang="scss" scoped>
@import 'src/styles/utils/__module__';

$padding: 1rem;

label.custom-checkbox[data-name="check-all"] {
    margin-left: $padding;
}

ul {
    padding: $padding;
    border: 1px solid $grey400;
    li {
        margin-bottom: $padding;
        &:last-of-type {
            margin-bottom: 0;
        }
        span[data-name="doc-link"] {
            float: right;
            a {
                text-decoration: underline;
            }
        }
        label.custom-checkbox {
            margin: 0;
        }
    }
}
</style>

<script lang="ts">
/**
 * @class TermsAgreeForm
 * @extends Vue
 * @member { boolean } isCheckedPrivacyPolicy 개인정보처리방침 체크 여부
 * @member { boolean } isCheckedTerms 서비스 이용약관 체크 여부
 * @member { boolean } isCheckedSendEmail 이메일 수신 동의 체크 여부
 */
import { Vue, Component, Watch } from 'vue-property-decorator';
import { SignupTerms } from '@/interfaces/Form.interface';

@Component({
    name: 'TermsAgreeForm',
})
class TermsAgreeForm extends Vue {
    isCheckedPrivacyPolicy: boolean;
    isCheckedTerms: boolean;
    isCheckedSendEmail: boolean;

    constructor () {
        super();

        this.isCheckedPrivacyPolicy = false;
        this.isCheckedTerms = false;
        this.isCheckedSendEmail = false;
    }

    get termsModel (): SignupTerms {
        const model: SignupTerms = {
            privacyPolicy: this.isCheckedPrivacyPolicy,
            terms: this.isCheckedTerms,
            sendEmail: this.isCheckedSendEmail,
        };

        return model;
    }

    /**
     * @event onChangeTermsModel
     * @desc 필수사항인 privacy policy와 term of service 항목이
     * 모두 체크 되어 있다면 모델을 부모에게 emit한다.
     * 만약 체크되어있지 않다면 null값을 emit한다.
     */
    @Watch('termsModel')
    onChangeTermsModel (model: SignupTerms): void {
        if (model.privacyPolicy && model.terms) {
            this.$emit('input', this.termsModel);
        }
        else {
            this.$emit('input', null);
        }
    }

    /**
     * @method onChangeCheckAll
     * @argument { boolean } val
     * @desc 약관 전체 동의 체크박스의 값을 해당 컴포넌트의 모든 체크박스의 값에 바인딩한다
     */
    onChangeCheckAll (val: boolean): void {
        this.isCheckedPrivacyPolicy = val;
        this.isCheckedTerms = val;
        this.isCheckedSendEmail = val;
    }
}
export default TermsAgreeForm;
</script>
