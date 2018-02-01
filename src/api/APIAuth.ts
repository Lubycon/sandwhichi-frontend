/**
 * @class
 * @name APIAuth
 * @desc 인증 관련 API 모듈
 */
import { APICore } from '@/api/APICore';
import { API_BASE_URL } from '@/constants/env.constant';
import { UserSigninData, UserSignupData } from '@/interfaces/User.interface';

class APIAuth extends APICore {
    constructor () {
        super({
            baseURL: API_BASE_URL
        });
    }

    public signin (data: UserSigninData): Promise<any> {
        const endpoint: string = '/members/signin';
        return this.post(endpoint, data);
    }

    public signup (data: UserSignupData): Promise<any> {
        const endpoint: string = '/members/signup';
        return this.post(endpoint, data);
    }

    public signout (): void {
        APICore.store.dispatch('destroyToken', { reload: true });
    }

    public signdrop (): Promise<any> {
        const endpoint: string = '/members/signdrop';
        return this.delete(endpoint);
    }
}

const instance = new APIAuth();
export default instance;