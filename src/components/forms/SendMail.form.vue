<template>
<div>
    <b-form @submit.prevent="submit">
        <b-form-group>
            <b-form-input
                type="email"
                v-model="email"
                placeholder="ex) john0102@pixelstairs.com" />
        </b-form-group>
        <b-button type="submit">
            <span v-show="!isBusy">Submit</span>
            <i v-show="isBusy" class="fas fa-spin fa-circle-notch"></i>
        </b-button>
    </b-form>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'SendMailForm',
})
class SendMailForm extends Vue {
    email: string;

    constructor () {
        super();
        this.email = '';
    }

    @Prop({ default: false })
    isBusy: boolean;

    submit (): void {
        this.$emit('submit', { email: this.email });
    }
}
export default SendMailForm;
</script>
