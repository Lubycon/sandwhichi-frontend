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

    get username () {
        const name = `${this.lastName}${this.firstName}`;
        return name;
    }

    @Watch('username')
    onChangeUsername (name) {
        this.$emit('input', name);
    }
}
export default NameForm;
</script>
