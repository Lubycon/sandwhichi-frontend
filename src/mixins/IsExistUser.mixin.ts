import { Vue, Component } from 'vue-property-decorator';
import Q from 'q';
import _ from 'lodash';
import APIUser from '@/api/APIUser';

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

    async checkIsExistEmail (email: string): Promise<any> {
        const defer = Q.defer();
        try {
            const response = await APIUser.isExistEmail(email);
            defer.resolve(response.result);
        }
        catch (e) {
            defer.reject(false);
        }
        return defer.promise;
    }

    created () {
        this.$validator.extend('existEmail', {
            getMessage: field => '존재하지 않는 계정입니다.',
            validate: value => {
                return this.checkIsExistEmail(value).then(res => {
                    return { valid: res };
                });
            },
        })
        this.$validator.extend('avoidExistEmail', {
            getMessage: field => `이미 존재하는 계정 입니다.`,
            validate: value => {
                return this.checkIsExistEmail(value).then(res => {
                    return { valid: !res };
                });
            },
        });
    }
}
