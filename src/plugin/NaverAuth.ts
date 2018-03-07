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
        const uri: string = `${this.authUrl}?client_id=${clientID}&response_type=${responseType}&redirect_uri=${redirectURI}&state=${state}`;
        
        if (popup) {
            window.open(uri);
        }
        else {
            location.href = uri;
        }
    }
}

export default NaverAuth;