import { Vue, Component } from 'vue-property-decorator';
import Q from 'q';
import _ from 'lodash';
import APIUser from '@/api/APIUSer';

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

    async isExistEmail (email: string): Promise<any> {
        const defer = Q.defer();
        try {
            const response = await APIUser.isExistEmail(email);
            defer.resolve(!response.result);
        }
        catch (e) {
            defer.reject(false);
        }
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
    }
}
