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
        return this.get(endpoint)
            .then(res => {
                if (res.results) {
                    const defaultCityAddress = [{ text: '지역1를 선택해주세요.', value: '' }];
                    const cityAddress = res.results.reduce((cityOptions, cityOption) => {
                        cityOptions.push({
                            value: cityOption.code,
                            text: cityOption.address
                        });
                        return cityOptions;
                    }, defaultCityAddress);
                    return Promise.resolve(cityAddress);
                } else {
                    throw new Error(res.message);
                }
            });
    }

    public fetchProvinceAddress (cityCode: string): Promise<IAddressCode[]> {
        const endpoint: string = `/locations/${cityCode}/`;
        return this.get(endpoint)
            .then(res => {
                if (res.results) {
                    const defaultProvinceAddress = [{ text: '지역2를 선택해주세요.', value: '' }];
                    const provinceAddress = res.results.reduce((provinceOptions, provinceOption) => {
                        provinceOptions.push({
                            value: provinceOption.code,
                            text: provinceOption.address
                        });
                        return provinceOptions;
                    }, defaultProvinceAddress);
                    return Promise.resolve(provinceAddress);
                } else {
                    throw new Error(res.message);
                }
            });
    }

    public fetchDistrictAddress (cityCode: string, provinceCode: string): Promise<IAddressCode[]> {
        const endpoint: string = `/locations/${cityCode}/${provinceCode}/`;
        return this.get(endpoint)
            .then(res => {
                if (res.results) {
                    const defaultDistrictAddress = [{ text: '지역3를 선택해주세요.', value: '' }];
                    const districtAddress = res.results.reduce((districtOptions, districtOption) => {
                        districtOptions.push({
                            value: districtOption.code,
                            text: districtOption.address
                        });
                        return districtOptions;
                    }, defaultDistrictAddress);
                    return Promise.resolve(districtAddress);
                } else {
                    throw new Error(res.message);
                }
            })

    }
}

const instance = new APIAddress();
export default instance;
