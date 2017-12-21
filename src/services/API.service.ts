import axios from 'axios';
import Q from 'q';

import { Store } from 'vuex';
import { CUSTOM_HEADER_PREFIX } from '@/constants';
import { API_BASE_URL } from '@/constants/env.constant';
import { API_LIST } from '../constants/api.constant';

class APIService {
    private axios: any;
    private apilist: any;
    private router: any;
    private store: Store<any>;

    private myAuthToken: string;
    private myRefreshToken: string;

    constructor (axios: any, API_LIST: any) {
        this.axios = axios.create({ baseURL: API_BASE_URL });
        this.apilist = this.generateAPI(API_LIST);
    }

    init ({ router, store }) {
        this.router = router;
        this.store = store;
    }

    set authToken (newAuthToken: string) {
        this.myAuthToken = newAuthToken;
        this.axios.defaults.headers.common.Authorization = `Bearer ${newAuthToken}`;
    }

    get authToken (): string {
        return this.myAuthToken;
    }

    set refreshToken (newRefreshToken: string) {
        this.myRefreshToken = newRefreshToken;
        this.axios.defaults.headers.common[`${CUSTOM_HEADER_PREFIX}refresh-token`] = newRefreshToken;
    }

    get refreshToken (): string {
        return this.myRefreshToken;
    }

    public destroyToken (): void {
        this.myAuthToken = null;
        this.myRefreshToken = null;
        delete this.axios.defaults.headers.common.Authorization;
        delete this.axios.defaults.headers.common[`${CUSTOM_HEADER_PREFIX}refresh-token`];
    }

    public resource (api: string, id: number|string = null): any {
        return {
            get: (params) => this.GET(api, id, params),
            post: (data) => this.POST(api, id, data),
            put: (data) => this.PUT(api, id, data),
            delete: (data) => this.DELETE(api, id, data),
        };
    }

    private GET (api: string, id: number|string = null, params: any): Promise<any> {
        let defer = Q.defer();
        api = this.getURI(api, id);

        this.axios.get(api, { params })
        .then(res => {
            console.log('GET res => ', res.data);
            defer.resolve(res.data);
        }, err => {
            if (err) {
                console.error('API GET ERROR!');
                console.error(err.stack);
            }
            this.errorHandler(err).then(res => {
                defer.resolve(res.data);
            }, err => {
                console.log('FINAL ERR => ', err);
                if (err) {
                    defer.reject(err);
                }
            });
        });

        return defer.promise;
    }

    private POST (api: string, id: number|string = null, data: any): Promise<any> {
        let defer = Q.defer();
        api = this.getURI(api, id);

        this.axios.post(api, data)
        .then(res => {
            defer.resolve(res.data);
        }, err => {
            if (err) {
                console.error('API POST ERROR!');
            }
            return this.errorHandler(err).then(res => {
                defer.resolve(res.data);
            }, err => {
                console.log('FINAL ERR => ', err);
                if (err) {
                    defer.reject(err);
                }
            });
        });

        return defer.promise;
    }

    private PUT (api: string, id: number|string = null, data: any): Promise<any> {
        let defer = Q.defer();
        api = this.getURI(api, id);

        this.axios.put(api, data)
        .then(res => {
            defer.resolve(res.data);
        }, err => {
            if (err) {
                console.error('API PUT ERROR!');
            }
            return this.errorHandler(err).then(res => {
                defer.resolve(res.data);
            }, err => {
                console.log('FINAL ERR => ', err);
                if (err) {
                    defer.reject(err);
                }
            });
        });

        return defer.promise;
    }

    private DELETE (api: string, id: number|string, data: any): Promise<any> {
        let defer = Q.defer();
        api = this.getURI(api, id);

        this.axios.delete(api, data)
        .then(res => {
            defer.resolve(res.data);
        }, err => {
            if (err) {
                console.error('API DELETE ERROR!');
            }
            return this.errorHandler(err).then(res => {
                defer.resolve(res.data);
            }, err => {
                console.log('FINAL ERR => ', err);
                if (err) {
                    defer.reject(err);
                }
            });
        });

        return defer.promise;
    }

    private RETRY (config: any): Promise<any> {
        let defer = Q.defer();

        this.axios({
            method: config.method,
            url: config.url,
            data: config.data,
        }).then(res => {
            defer.resolve(res);
        }).catch(err => {
            if (err) {}
            defer.reject(err);
        });

        return defer.promise;
    }

    private REISSUANCE (): Promise<any> {
        console.log('[log] REISSUANCE START!');
        let defer = Q.defer();
        let api = this.getURI('users.refreshToken');
        console.log(api);
        this.axios.get(api).then(res => {
            console.log('[log] REISSUANCE => TRUE');
            console.log('[log] NEW AUTH TOKEN => ', res.data.result);
            console.log('[log] REFRESH TOKEN => ', this.refreshToken);
            this.store.dispatch('setToken', {
                accessToken: res.data.result,
                refreshToken: this.refreshToken,
            }).then(res => {
                defer.resolve();
            });
        }, err => {
            console.log('[log] REISSUANCE => FALSE');
            if (err) {}
            this.store.dispatch('destroyToken', { reload: false }).then(res => {
                console.log('destroy finished');
                defer.resolve();
            });
        });

        return defer.promise;
    }

    private errorHandler (err): Promise<any> {
        // defer.resolve => 200
        // defer.reject => error
        let defer = Q.defer();

        const IS_REFRESH_API: boolean = err.config.url.indexOf('/refresh') > -1;
        const IS_EXPIRED: boolean = err.response.status === 419;

        console.log('API GET ERROR FROM => ', err.config.url);
        console.log('ERROR: ', err.response.status);
        console.log('ERROR DATA:', err.response.data);
        console.log('IS_REFRESH_API: ', IS_REFRESH_API);
        console.log('IS_EXPIRED: ', IS_EXPIRED);

        if (IS_EXPIRED && !IS_REFRESH_API) {
            this.REISSUANCE().then(res => {
                console.log('[log] REISSUANCE IS FINISHED');
                this.RETRY(err.config).then(res => {
                    console.log('[log] RETRIED URL => ', res.config.url);
                    console.log('[log] RETRY RESPONSE => ', res.data);
                    defer.resolve(res);
                }, err => {
                    console.log('RETRY ERR => ', err.response.status);
                    defer.reject({
                        status: err.response.status,
                        data: err.response.data,
                    });
                });
            });
        }
        else {
            defer.reject({
                status: err.response.status,
                data: err.response.data,
            });
        }

        return defer.promise;
    }

    private getURI (api: string, id: number|string = null, uri: string = null, list: any = this.apilist, index: number = 0): string {
        let tmp: string[] = api.split('.');
        let type: string = typeof list[tmp[index]];

        if (list[tmp[index]]) {
            if (type === 'string') {
                uri = list[tmp[index]];
                return this.setParamsToAPI(uri, id);
            }
            else if (type === 'object') {
                return this.getURI(api, id, tmp[index], list[tmp[index]], index + 1);
            }
        }
        else {
            return uri;
        }
    }

    private setParamsToAPI (uri: string, uriParams: any): string {
        const regx: RegExp = /\{\w+\}/gi;
        const braketRegx: RegExp = /[{|}]/g;

        let params: string[] = uri.match(regx);
        if (!params || !params.length) {
            return uri;
        }

        params = params.map(v => {
            return v.replace(braketRegx, '');
        });

        let uriArr = uri.split('/').map(v => {
            return v.replace(braketRegx, '');
        });

        params.forEach(v => {
            let position = uriArr.indexOf(v);
            if (position > -1) uriArr[position] = uriParams[v];
        });

        return uriArr.join('/');
    }

    private generateAPI (API_LIST: any): any {
        let tmp: any = {};

        Object.keys(API_LIST).forEach(v => {
            if (API_LIST[v] instanceof Function) {
                tmp[v] = API_LIST[v]();
            }
            else {
                tmp[v] = API_LIST[v];
            }
        });

        return tmp;
    }
}

const instance = new APIService(axios, API_LIST);
export default instance;
