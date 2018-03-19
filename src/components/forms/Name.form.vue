<template>
<b-form-group label="이름">
    <b-row>
        <b-col cols="6" data-name="last-name">
            <b-form-input
                name="lastName"
                type="text"
                v-model.trim="lastName"
                placeholder="성"
                maxlength="10"
                :state="state"/>
        </b-col>
        <b-col cols="6" data-name="first-name">
            <b-form-input
                name="firstName"
                type="text"
                v-model.trim="firstName"
                maxlength="10"
                placeholder="이름"
                :state="state"/>
        </b-col>
    </b-row>
    <b-form-text
        v-if="!state"
        text-variant="invalid">
        {{ feedbackMsg }}
    </b-form-text>
</b-form-group>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
/**
 * @class NameForm
 * @extends Vue
 * @member { string } lastName 유저의 성
 * @member { string } firstName 유저의 이름
 */
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({
    name: 'NameForm',
})
class NameForm extends Vue {
    lastName: string;
    firstName: string;

    constructor () {
        super();
        this.lastName = '';
        this.firstName = '';
    }

    @Prop({ default: true })
    state: boolean;

    @Prop({ default: '' })
    feedbackMsg: string;

    /**
     * @member username
     * @return { String }
     * @desc 성과 이름을 조합하여 최종 이름을 리턴한다
     */
    get username (): string {
        const name = `${this.lastName}${this.firstName}`;
        return name;
    }

    /**
     * @event onChangeUsername
     * @desc 유저 이름을 컴포넌트 외부로 리턴한다
     */
    @Watch('username')
    onChangeUsername (name): void {
        this.$emit('input', name);
    }

    /**
     * @method setName
     * @argument { String } name
     * @argument { String? } lastName
     * @desc 컴포넌트 외부로부터 이름 모델을 주입받는다.
     * lastName값이 있다면 성과 이름으로 나누어서 바인딩하고
     * 없다면 이름의 첫글자는 성으로 나머지 글자는 이름으로 바인딩한다.
     */
    setName (name: string, lastName?: string): void {
        if (lastName) {
            this.lastName = lastName;
            this.firstName = name;
        }
        else {
            this.lastName = name.slice(0, 1);
            this.firstName = name.slice(1, name.length);
        }
    }
}
export default NameForm;
</script>
