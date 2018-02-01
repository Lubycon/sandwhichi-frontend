import { Vue, Component } from 'vue-property-decorator';
import ValidateService from '@/services/Validate.service';

@Component({})
export class PasswordMixin extends Vue {
    $validator: any;

    constructor () {
        super();
    }

    getPasswordLevel (password: string): string {
        const max = ValidateService.getPasswordTotalScore();
        const score = ValidateService.calcPasswordScore(password, max);

        return ValidateService.getPasswordLevel(score);
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
