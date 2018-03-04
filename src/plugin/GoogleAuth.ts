import Q from 'q';

class GoogleAuth {
    gapiUrl: string = 'https://apis.google.com/js/api:client.js';
    config: Object = {};
    googleAuthAPI: any = null;

    static install (Vue, config) {
        const instance = new GoogleAuth();
        let options = {};
        options = Object.assign(config, {
            scope: 'profile email https://www.googleapis.com/auth/plus.login',
        });
        instance.init(options);

        Vue.googleAuth = instance;
        Vue.prototype.$googleAuth = instance;
    }

    async init (config) {
        if (!config.clientId) {
            console.error('There is no client ID - GoogleAuth');
            return false;
        }
        this.config = config;

        const defer = Q.defer();
        if ((<any>window).gapi === undefined) {
            await this.loadClient();
            await this.initClient();
            defer.resolve();
        }
        else if ((<any>window).gapi !== undefined && (<any>window).gapi.auth2 === undefined) {
            await this.initClient();
            defer.resolve();
        }
        else {
            defer.reject();
        }

        return defer.promise;
    }

    async signin (): Promise<any> {
        const defer = Q.defer();
        try {
            const response = await this.googleAuthAPI.signIn();
            defer.resolve(response);
        }
        catch (e) {
            defer.reject(e);
        }
        return defer.promise;
    }

    async signout (): Promise<any> {
        const defer = Q.defer();
        try {
            const response = await this.googleAuthAPI.signOut();
            defer.resolve(response);
        }
        catch (e) {
            defer.reject(e);
        }
        return defer.promise;
    }

    private loadClient (): Promise<any> {
        const defer = Q.defer();
        const script: any = document.createElement('script');
        script.src = this.gapiUrl;
        script.onreadystatechange = script.onload = () => {
            if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                setTimeout(() => {
                    defer.resolve();
                }, 500)
            }
            else {
                defer.reject();
            }
        }
        document.getElementsByTagName('head')[0].appendChild(script);
        return defer.promise;
    }

    private initClient (): Promise<any> {
        const defer = Q.defer();
        (<any>window).gapi.load('auth2', () => {
            (<any>window).gapi.auth2.init(this.config)
            this.googleAuthAPI = (<any>window).gapi.auth2.getAuthInstance();
            defer.resolve();
        });
        return defer.promise;
    }
}

export default GoogleAuth;
