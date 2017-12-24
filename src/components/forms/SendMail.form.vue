<template>
<div>
    <b-form @submit.prevent="submit">
        <b-form-group>
            <b-form-input
                type="email"
                v-model="email"
                placeholder="ex) john0102@pixelstairs.com"
            />
        </b-form-group>
        <b-button type="submit">
            <span v-show="!isBusy">Submit</span>
            <i v-show="isBusy" class="loading-ico pxs-spinner-1 spin"></i>
        </b-button>
    </b-form>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import APIService from '@/services/API.service';

@Component({
    name: 'SendMailForm',
})
class SendMailForm extends Vue {
    email: string;
    isBusy: boolean;

    constructor () {
        super();
        this.email = null;
        this.isBusy = false;
    }

    @Prop({ required: true })
    api: string;

    submit (): void {
        this.isBusy = true;
        APIService.resource(this.api).post({ email: this.email })
        .then(res => {
            this.isBusy = false;
            this.$emit('submit', {
                res,
                email: this.email,
            });
        }, err => {
            if (err) {}
            this.isBusy = false;
        });
    }
}
export default SendMailForm;
</script>
