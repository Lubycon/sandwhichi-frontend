/**
 * @class
 * @name APICore
 * @desc API 코어 모듈
 * @prop { Any } axios
 * @prop { String } authToken
 */
import axios from 'axios';
import Q from 'q';
import { Store } from 'vuex';
import { CUSTOM_HEADER_PREFIX } from '@/constants';
import { API_BASE_URL } from '@/constants/env.constant';

export class APICore {
    public axios: any;
    public static store: Store<any>;

    private _authToken: string;
    private _refreshToken: string;
    private router: any;

    constructor (options) {
        this.axios = axios.create(options);
        this._authToken = '';
        this._refreshToken = '';
    }

    public set authToken (newToken: string) {
        this._authToken = newToken;
        this.axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
    }

    public get authToken () {
        return this._authToken;
    }

    public set refreshToken (newToken) {
        this._refreshToken = newToken;
        this.axios.defaults.headers.common[`${CUSTOM_HEADER_PREFIX}refresh-token`] = newToken;
    }

    public get refreshToken () {
        return this._refreshToken;
    }

    protected async get (api: string, params?: any) {
        const defer = Q.defer();
        try {
            const response = await this.axios.get(api, { params });
            defer.resolve(response.data);
        }
        catch (e) {
            console.error(`API GET Error => ${e.stack}`);
            try {
                const errorHandler = await this.errorHandler(e);
                defer.resolve(errorHandler.data);
            }
            catch (e) {
                console.error(`Final Error => ${e}`);
                defer.reject(e);
            }
        }
        return defer.promise;
    }

    protected async post (api: string, data?: any) {
        const defer = Q.defer();
        try {
            const response = await this.axios.post(api, data);
            defer.resolve(response.data);
        }
        catch (e) {
            console.error(`API POST Error => ${e.stack}`);
            try {
                const errorHandler = await this.errorHandler(e);
                defer.resolve(errorHandler.data);
            }
            catch (e) {
                console.error(`Final Error => ${e}`);
                defer.reject(e);
            }
        }
        return defer.promise;
    }

    protected async put (api: string, data?: any) {
        const defer = Q.defer();
        try {
            const response = await this.axios.put(api, data);
            defer.resolve(response.data);
        }
        catch (e) {
            console.error(`API POST Error => ${e.stack}`);
            try {
                const errorHandler = await this.errorHandler(e);
                defer.resolve(errorHandler.data);
            }
            catch (e) {
                console.error(`Final Error => ${e}`);
                defer.reject(e);
            }
        }
        return defer.promise;
    }

    protected async delete (api) {
        const defer = Q.defer();
        try {
            const response = await this.axios.delete(api);
            defer.resolve(response.data);
        }
        catch (e) {
            console.error(`API POST Error => ${e.stack}`);
            try {
                const errorHandler = await this.errorHandler(e);
                defer.resolve(errorHandler.data);
            }
            catch (e) {
                console.error(`Final Error => ${e}`);
                defer.reject(e);
            }
        }
        return defer.promise;
    }

    private async retry (config: any): Promise<any> {
        const defer = Q.defer();
        try {
            const response = await this.axios({
                method: config.method,
                url: config.url,
                data: config.data,
            });
            defer.resolve(response);
        }
        catch (e) {
            defer.reject(e);
        }

        return defer.promise;
    }

    private async reissuance (): Promise<any> {
        console.log('[log] Reissuance Start...');

        const defer = Q.defer();
        const endpoint: string = `${API_BASE_URL}/members/token/refresh`;

        console.log(`ENDPOINT -> ${endpoint}`);

        try {
            const response = await this.axios.get(endpoint);

            console.log('[log] Reissuance Success....');
            console.log(`[log] New Auth Token => ${response.data.result}`);
            console.log(`[log] Refresh Token => ${this.refreshToken}`);

            APICore.store.dispatch('setToken', {
                accessToken: response.data.result,
                refreshToken: this.refreshToken,
            }).then(res => {
                defer.resolve();
            });
        }
        catch (e) {
            console.log('[log] Reissuance is failed.');
            APICore.store.dispatch('destroyToken', {
                reload: false
            }).then(res => {
                defer.resolve();
            });
        }

        return defer.promise;
    }

    private async errorHandler (err): Promise<any> {
        const defer = Q.defer();
        const isRefreshEndpoint: boolean = err.config.url.indexOf('/refresh');
        const isExpired: boolean = err.response.status === 419;

        console.log(`API GET Error From => ${err.config.url}`);
        console.log(`Error: ${err.response.status}`);
        console.log(`Error Data: ${err.response.data}`);
        console.log(`is refresh api: ${isRefreshEndpoint}`);
        console.log(`is expired: ${isExpired}`);

        /**
         * @desc
         * 토큰이 만료되었으나 해당 엔드포인트가 Refresh토큰 발급 엔드포인트가 아닐 때
         * Refresh토큰 재발급 시도를 한다
         */
        if (isExpired && !isRefreshEndpoint) {
            try {
                const refreshTokenResponse = await this.reissuance();
                console.log('[log] Reissuance is finished');
                
                const retriedResponse = await this.retry(err.config);
                console.log(`[log] Retried Url => ${retriedResponse.config.url}`);
                console.log(`[log] Retried Response => ${retriedResponse.data}`);

                defer.resolve(retriedResponse);
            }
            catch (e) {
                console.log(`[log] Retry Error => ${e.response.status}`);
                defer.reject({
                    status: e.response.status,
                    data: e.response.data,
                });
            }
        }
        else {
            defer.reject({
                status: err.response.status,
                data: err.response.data,
            });
        }

        return defer.promise;
    }
}