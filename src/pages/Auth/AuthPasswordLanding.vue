<template>
<div class="container" v-if="isLoaded">
    <h1>Password landing</h1>
    <p>{{ codeValidationResult }}</p>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { AuthCodeMixin } from '@/mixins/AuthCode.mixin';

@Component({
    name: 'AuthPasswordLanding',
    mixins: [ AuthCodeMixin ],
})
class AuthPasswordLanding extends Vue {
    codeValidationResult: boolean;
    fetchCodeValidation: Function;

    isLoaded: boolean;
    errCode: string;

    @Prop({ required: true })
    code: string;

    created () {
        this.fetchCodeValidation('certs.password.code', this.code)
        .then(res => {
            if (res.validity) {
                this.$router.push({
                    name: 'user-setting-password',
                    params: { code: this.code },
                });
            }
            else {
                // Do nothing
            }
        }, err => {
            this.$set(this, 'isLoaded', true);
            if (err) {
                this.$set(this, 'errCode', err.status);
            }
        });
    }
}
export default AuthPasswordLanding;
</script>
