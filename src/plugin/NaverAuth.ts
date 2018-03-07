/**
 * @class NaverAuth
 * @member { string } authUrl
 * @member { config } Object
 * @desc 네이버 인증은 RESTful API로 인증 받는 방식이 아닌,
 * 직접 해당 url로 이동하거나 새로운 창을 띄워서 인증을 진행하고 이후 redirect_uri값에 보냈던 uri로 사용자를 리턴시키는 방식이다.
 */

class NaverAuth {
    authUrl: string = 'https://nid.naver.com/oauth2.0/authorize';
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

    signin (to: string, popup: boolean = false): void {
        const clientID: string = (<any>this.config).clientId;
        const redirectURI: string = `${location.origin}${to}`;
        const responseType: string = 'code';
        const state: string = 'naverauth-sandwhichi';
        const locale = 'ko';
        const uri: string = `${this.authUrl}?client_id=${clientID}&response_type=${responseType}&redirect_uri=${redirectURI}&state=${state}&locale=${locale}`;
        
        if (popup) {
            window.open(uri);
        }
        else {
            location.href = uri;
        }
    }
}

export default NaverAuth;