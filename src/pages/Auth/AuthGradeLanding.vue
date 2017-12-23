<template>
<div class="container row">
    <div v-if="isLoaded" class="col-12 col-md-6 col-lg-4 card card--center-form">
        <div v-if="validity" data-section="form-desc" data-name="result">
            <h1>Welcome to the <strong>Pixelstairs</strong></h1>
            <p>
                Now, You can upload your works freely!
            </p>
        </div>
        <div v-else data-section="form-desc" data-name="error">
            <h4 data-name="error-code">Error Code: <strong>{{ errCode }}</strong></h4>
            <h1>Oh, Something is wrong...</h1>
            <p data-name="error-message">
                {{ errMsg }}<br>
                If the problem persists, contact Sandwhichi.
            </p>
        </div>
        <div data-section="control" v-if="validity">
            <b-button v-if="!isAuthorized" :to="{ name: 'signin' }">Login now!</b-button>
            <b-button v-if="isAuthorized" :to="{ name: 'artwork-upload' }">Upload now!</b-button>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
@import 'src/styles/utils/__module__';

h1 {
    margin-bottom: 40px;
}
div[data-name="result"] {}
div[data-name="error"] {
    h4 {
        text-align: center;
        margin-bottom: 40px;
    }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { AuthCodeMixin } from '@/mixins/AuthCode.mixin';

@Component({
    name: 'AuthGradeLanding',
    mixins: [ AuthCodeMixin ],
})
class AuthGradeLanding extends Vue {
    codeValidationResult: boolean;
    fetchCodeValidation: Function;

    isLoaded: boolean;
    validity: boolean;
    errCode: string;
    errMsg: string;

    constructor () {
        super();

        this.isLoaded = false;
        this.validity = false;
        this.errCode = '';
        this.errMsg = '';
    }

    @Prop({ required: true })
    code: string;

    @Getter('isAuthorized') isAuthorized;

    created () {
        this.fetchCodeValidation('certs.signup.code', this.$route.params.code)
        .then(res => {
            this.$set(this, 'isLoaded', true);
            this.$set(this, 'validity', res.validity);
        }, err => {
            this.$set(this, 'isLoaded', true);
            if (err) {
                this.$set(this, 'errCode', `${err.status} - ${err.data.status.code}`);
                this.$set(this, 'errMsg', err.data.status.msg);
            }
        });
    }
}
export default AuthGradeLanding;
</script>
