class GoogleAuth {

    init (config) {
        console.log(config);
    }
}

let instance = new GoogleAuth();

GoogleAuth.install = function (Vue, config) {
    let options = {};
    options = Object.assign(config, {
        scope: 'profile email https://www.googleapis.com/auth/plus.login',
    });
    instance.init(options);

    Vue.prototype.$googleAuth = instance;
};

export default GoogleAuth;
