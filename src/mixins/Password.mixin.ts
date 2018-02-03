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
        this.$validator.extend('security', {
            getMessage: field => `Your ${field} must be more complicated`,
            validate: value => {
                return this.getPasswordLevel(value) !== 'invalid';
            },
        });
    }
}
