import { Vue, Component } from 'vue-property-decorator';
import Q from 'q';
import APIService from '@/services/API.service';

@Component({})
export class AuthCodeMixin extends Vue {
    codeValidationResult: boolean;

    constructor () {
        super();
        this.codeValidationResult = false;
    }

    fetchCodeValidation (api: string, code: string ): Promise<any> {
        let defer = Q.defer();

        APIService.resource(api).post({ code })
        .then(res => {
            this.codeValidationResult = res.result.validity;
            defer.resolve(res.result);
        }, err => {
            defer.reject(err);
        });

        return defer.promise;
    }
}
