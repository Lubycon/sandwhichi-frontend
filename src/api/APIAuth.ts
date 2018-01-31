/**
 * @class
 * @name APIAuth
 * @desc 인증 관련 API 모듈
 */
import { APICore } from '@/api/APICore';
import { API_BASE_URL } from '@/constants/env.constant';

class APIAuth extends APICore {
    constructor () {
        super({
            baseURL: API_BASE_URL
        });
    }

    public signin (email: string, password: string): Promise<any> {
        const endpoint: string = '/members/signin';
        return this.post(endpoint, { email, password });
    }

    public signout () {
        APICore.store.dispatch('destroyToken', { reload: true });
    }
}

const instance = new APIAuth();
export default instance;