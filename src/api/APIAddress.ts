/**
 * @class APIAuth
 * @desc 인증 관련 API 모듈
 */

import { APICore } from '@/api/APICore';

import { API_BASE_URL } from '@/constants/env.constant';
import { IHTTPResponse } from '@/interfaces/utils/HTTP.interface';
import { IAddressCode } from '@/interfaces/utils/Address.interface';

class APIAddress extends APICore {
    constructor () {
        super({
            baseURL: API_BASE_URL
        })
    }

    public fetchCityAddress (): Promise<IAddressCode[]> {
        const endpoint: string = `/locations/`;
        return this.get(endpoint);
    }

    public fetchProvinceAddress (cityCode: string): Promise<IAddressCode[]> {
        const endpoint: string = `/locations/${cityCode}/`;
        return this.get(endpoint);
    }

    public fetchDistrictAddress (cityCode: string, provinceCode: string): Promise<IAddressCode[]> {
        const endpoint: string = `/locations/${cityCode}/${provinceCode}/`;
        return this.get(endpoint);
    }
}

const instance = new APIAddress();
export default instance;
