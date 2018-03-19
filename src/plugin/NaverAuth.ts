/**
 * @class NaverAuth
 * @member { string } authAPI
 * @member { string } myInfoAPI
 * @member { string } defaultSigninRedirect
 * @member { config } Object
 * @desc 네이버 인증은 RESTful API로 인증 받는 방식이 아닌,
 * 직접 해당 url로 이동하거나 새로운 창을 띄워서 인증을 진행하고 이후 redirect_uri값에 보냈던 uri로 사용자를 리턴시키는 방식이다.
 */
import Q from 'q';
import axios from 'axios';

class NaverAuth {
    authAPI: string = 'https://nid.naver.com/oauth2.0/authorize';
    myInfoAPI: string = 'https://openapi.naver.com/v1/nid/me';
    defaultSigninRedirect: string = 'home';
    config: Object = {};

    static install (Vue, config) {
        const instance = new NaverAuth();
        let options = {};
        options = Object.assign(config, {
            scope: 'profile email https://www.googleapis.com/auth/plus.login',
        });
        instance.init(options);

        Vue.naverAuth = instance;
        Vue.prototype.$naverAuth = instance;
    }

    init (config) {
        if (!config.clientId) {
            console.error('There is no client ID - NaverAuth');
            return false;
        }
        this.config = config;
    }

    /**
     * @method signin
     * @argument { string } to Naver Auth 진행 후 리다이렉트 될 URL
     * @argument { string } redirect Signin 성공 시 리다이렉트 될 URL
     * @argument { boolean } popup 새 창을 띄울 것인지 여부, false라면 router만 변경된다
     */
    signin (to: string, redirect: string = this.defaultSigninRedirect, popup: boolean = false, ): void {
        const clientID: string = (<any>this.config).clientId;
        const redirectURI: string = `${location.origin}${to}`;
        const responseType: string = 'code';
        const state: string = encodeURI(`naverauth-sandwhichi:redirect=${redirect}`);
        const locale = 'ko';
        const uri: string = `${this.authAPI}?client_id=${clientID}&response_type=${responseType}&redirect_uri=${redirectURI}&state=${state}&locale=${locale}`;
        
        if (popup) {
            window.open(uri);
        }
        else {
            location.href = uri;
        }
    }

    /**
     * @method getMyInfo
     * @argument { string } token
     * @return { Promise<any> }
     * @desc 액세스토큰을 사용하여 네이버 유저 정보를 받아온다
     */
    async getMyInfo (token: string): Promise<any> {
        const defer = Q.defer();
        try {
            const response = await axios.get(this.myInfoAPI, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            defer.resolve(response);
        }
        catch (e) {
            defer.reject(e);
        }
        return defer.promise;
    }
}

export default NaverAuth;