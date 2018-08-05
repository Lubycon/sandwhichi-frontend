/**
 * @class APIAuth
 * @desc 인증 관련 API 모듈
 */
import { APICore } from '@/api/APICore';
import { API_BASE_URL } from '@/constants/env.constant';
import {
    UserSigninData, UserSigndropData, UserSignupData
} from '@/interfaces/User.interface';

class APIAuth extends APICore {
    constructor () {
        super({
            baseURL: API_BASE_URL,
        });
    }

    public signin (data: UserSigninData): Promise<any> {
        const endpoint: string = '/auth/signin/';
        return this.post(endpoint, data);
    }

    public signup (data: UserSignupData): Promise<any> {
        const endpoint: string = '/auth/signup/';
        return this.post(endpoint, data);
    }

    public signout (reload: boolean = true): void {
        APICore.store.dispatch('destroyToken', { reload });
    }

    public signdrop (data: UserSigndropData): Promise<any> {
        const endpoint: string = '/users/signdrop';
        return this.delete(endpoint, data);
    }

    public getSigndropSurvey (): Promise<any> {
        const endpoint = '/users/signdrop/survey/list';
        return this.get(endpoint);
    }

    public sendSignupMail (): Promise<any> {
        const endpoint = '/certs/signup/mail';
        return this.post(endpoint);
    }

    public getSignupLeftTime (): Promise<any> {
        const endpoint = '/certs/signup/time';
        return this.get(endpoint);
    }

    public checkSignupCertCode (code: string): Promise<any> {
        const endpoint = '/certs/signup/code';
        return this.post(endpoint, { code });
    }

    public sendPasswordMail (email: string): Promise<any> {
        const endpoint = '/members/password/mail';
        return this.post(endpoint, { email });
    }

    public checkPassword (data: UserSigninData): Promise<any> {
        const endpoint = '/certs/password';
        return this.post(endpoint, data);
    }

    public checkPasswordCertCode (code: string): Promise<any> {
        const endpoint = '/certs/password/code';
        return this.post(endpoint, { code });
    }

    public createPasswordToken () {
        const endpoint = '/users/password/token';
        return this.post(endpoint);
    }

    public resetPassword (password: string, code: string): Promise<any> {
        const endpoint = '/users/password/reset';
        return this.post(endpoint, { newPassword: password, code });
    }

    public getUser () {}

    public getUserNaver ({ code, state }): Promise<any> {
        const endpoint = `/users/naver/profile/code/${code}/state/${state}`;
        return this.get(endpoint);
    }
}

const instance = new APIAuth();
export default instance;
