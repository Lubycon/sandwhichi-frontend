import { Vue, Component } from 'vue-property-decorator';
import Q from 'q';
import APIService from '@/services/API.service';

interface IsExistUserModel {
    email: boolean;
    name: boolean;
}

@Component({})
export class isExistUserMixin extends Vue {
    $validator: any;
    isExistUser: IsExistUserModel;

    constructor () {
        super();
    }

    isExistEmail (email: string): Promise<any> {
        const defer = Q.defer();

        APIService.resource('users.exists.email').post({ email })
        .then(res => {
            defer.resolve(!res.result);
        }, err => {
            defer.reject(false);
        });

        return defer.promise;
    }

    isExistName (name: string): Promise<any> {
        const defer = Q.defer();

        APIService.resource('users.exists.name').post({ nickname: name })
        .then(res => {
            defer.resolve(!res.result);
        }, err => {
            defer.reject(false);
        });

        return defer.promise;
    }

    created () {
        this.$validator.extend('existEmail', {
            getMessage: field => `Your ${field} has already exist`,
            validate: value => {
                return this.isExistEmail(value).then(res => {
                    return { valid: res };
                });
            },
        });
        this.$validator.extend('existName', {
            getMessage: field => `Your ${field} has already exist`,
            validate: value => {
                return this.isExistName(value).then(res => {
                    return { valid: res };
                });
            },
        });
    }
}
