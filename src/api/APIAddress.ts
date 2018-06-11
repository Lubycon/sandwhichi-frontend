/**
 * @class APIAuth
 * @desc 인증 관련 API 모듈
 */

import { APICore } from '@/api/APICore';
import { API_BASE_URL } from '@/constants/env.constant';

class APIAddress extends APICore {
    constructor () {
        super({
            baseURL: API_BASE_URL
        })
    }

    public fetchAddress (cityCode: string = ''): Promise<any> {
        const endpoint: string = `/locations/${cityCode}`;
        return this.get(endpoint);
    }
}

const instance = new APIAddress();
export default instance;
