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
import { Vue, Component } from 'vue-property-decorator';

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

    onChangeCheckAll (val: boolean): void {
        this.isCheckedPrivacyPolicy = val;
        this.isCheckedTerms = val;
        this.isCheckedSendEmail = val;
    }
}
export default TermsAgreeForm;
</script>
