import { Vue, Component } from 'vue-property-decorator';
import Validate from '@/helpers/Validate';

@Component({})
export class PasswordMixin extends Vue {
    $validator: any;

    constructor () {
        super();
    }

    getPasswordLevel (password: string): string {
        const max = Validate.getPasswordTotalScore();
        const score = Validate.calcPasswordScore(password, max);

        return Validate.getPasswordLevel(score);
    }

    created () {
        this.$validator.extend('passwordSecurity', {
            getMessage: field => '비밀번호 보안 수준이 너무 낮습니다',
            validate: value => {
                return this.getPasswordLevel(value) !== 'invalid';
            },
        });
    }
}
