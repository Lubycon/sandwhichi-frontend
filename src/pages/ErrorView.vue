<template>
<div class="container-fluid">
    <div class="card card--center-form">
        <div class="message">
            <h1 data-name="error-code">{{ code }}</h1>
            <h3 data-name="error-message">{{ message }}</h3>
        </div>

        <b-button class="btn" @click="go">Go home</b-button>
    </div>
</div>
</template>

<style lang="scss" scoped>
.card--center-form {
    text-align: center;
}

.message {
    margin-bottom: 30px;
    h1[data-name="error-code"] {
        font-weight: bold;
        font-size: 80px;
    }
    h3[data-name="error-message"] {
        font-size: 18px;
    }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'ErrorView',
})
class ErrorView extends Vue {
    @Prop({ default: '500' })
    code: string;

    get errorMessage (): string {
        let output: string;
        switch (this.code) {
        case '400':
            output = '잘못된 요청입니다';
            break;
        case '401':
            output = '인증되지 않은 요청입니다';
            break;
        case '403':
            output = '금지된 요청입니다';
            break;
        case '404':
            output = '존재하지 않는 페이지입니다';
            break;
        case '408':
            output = '타임아웃';
            break;
        default:
            output = '알 수 없는 에러입니다';
            break;
        }

        return `${output}`;
    }

    go () {
        this.$router.push({ name: 'home' });
    }
}
export default ErrorView;
</script>
