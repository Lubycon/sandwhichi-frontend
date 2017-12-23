<template>
<div class="container row">
    <div class="col-12 col-md-6 col-lg-4 card card--center-form">
        <div data-section="form-desc">
            <h1>Now, it's the last step for more activities</h1>
            <p>
                You need to authenticate your email address for further activity.<br>
                Please check your email!
            </p>
        </div>
        <div data-section="time">
            <p v-if="!isExpired">
                <strong>{{ computedLeftTime.minutes() }}</strong> min
                <strong>{{ computedLeftTime.seconds() }}</strong> sec left
            </p>
            <p v-else="isExpired" class="expired-time">
                Expired
            </p>
        </div>
        <div data-section="control">
            <b-button class="btn" @click="sendEmailAgain">Send email again</b-button>
            <b-button class="btn btn-border" :to="{ name: 'home' }">Later</b-button>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
@import 'src/styles/utils/__module__';

div[data-section="time"] {
    margin-bottom: 40px;
    p {
        text-align: center;
        strong {
            font-size: 24px;
            font-weight: bold;
            color: $blue;
        }
    }
    p.expired-time {
        color: $red;
        font-weight: bold;
        font-size: 24px;
        margin: 0;
    }
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import APIService from '@/services/API.service';

@Component({
    name: 'AuthGrade',
})
class AuthGrade extends Vue {
    leftTime: number;
    interval: number;
    $moment: any;

    get isExpired (): boolean {
        return this.leftTime < 1;
    }

    get computedLeftTime (): any {
        let time: number = this.leftTime;
        if (this.isExpired) {
            time = 0;
        }
        return this.$moment.duration(time);
    }

    fetchLeftTime (): void {
        return APIService.resource('certs.signup.time').get()
        .then(res => {
            this.$set(this, 'leftTime', res.result.time * 1000);
            this.countDownStart();
        });
    }

    sendEmailAgain (): void {
        return APIService.resource('certs.signup.mail').post()
        .then(res => {
            alert('The Activation mail has been send');
            this.fetchLeftTime();
        }, err => {
            if (err) {}
            alert('Mail Error');
        });
    }

    countDownStart (): void {
        if (!this.isExpired && this.leftTime) {
            clearInterval(this.interval);
            this.interval = setInterval(() => {
                let time: number = this.leftTime - 1000;
                this.leftTime = time > 0 ? time : 0;
            }, 1000);
        }
    }

    created () {
        this.fetchLeftTime();
    }
}
export default AuthGrade;
</script>
