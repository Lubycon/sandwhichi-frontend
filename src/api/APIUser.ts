/**
 * @class APIUser
 * @desc 유저 관련 API 모듈
 */
import { APICore } from '@/api/APICore';
import { API_BASE_URL } from '@/constants/env.constant';

class APIUser extends APICore {
    constructor () {
        super({
            baseURL: API_BASE_URL
        });
    }

    public getMyData (): Promise<any> {
        const endpoint = '/users/me';
        return this.get(endpoint);
    }

    public getUserData (id: string|number): Promise<any> {
        const endpoint = `/users/${id}`;
        return this.get(endpoint);
    }

    public isExistEmail (email: string): Promise<any> {
        const endpoint = '/users/exists/email';
        return this.post(endpoint, { email });
    }
}

const instance = new APIUser();
export default instance;
