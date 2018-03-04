const env = process.env.NODE_ENV;

interface ENV_CONFIG {
    API_BASE_URL: string;
    S3_BASE_URL: string;
    GOOGLE_CLIENT_ID: string;
    NAVER_CLIENT_ID: string;
}

function getEnv (env: string): ENV_CONFIG {
    let apiBaseUrl: string = '';
    let s3BaseUrl: string = '';
    let googleClientId: string = '';
    let naverClientId: string = '';

    if (env === 'production') {
        apiBaseUrl = 'https://api.pixelstairs.com/v1';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/pixelstairs';
        googleClientId = '146842299447-7m22num6mai47qftdge5fi1qvjp1bkg1.apps.googleusercontent.com';
        naverClientId = 'HAjQ7lH1Jk8PqJUeHajh';
    }
    else if (env === 'development') {
        apiBaseUrl = 'https://dev.api.pixelstairs.com/v1';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/dev.pixelstairs';
        googleClientId = '146842299447-7m22num6mai47qftdge5fi1qvjp1bkg1.apps.googleusercontent.com';
        naverClientId = 'HAjQ7lH1Jk8PqJUeHajh';
    }
    else if (env === 'local' || env === 'test') {
        apiBaseUrl = 'http://local.api.pixelstairs.com/v1';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/dev.pixelstairs';
        googleClientId = '146842299447-7m22num6mai47qftdge5fi1qvjp1bkg1.apps.googleusercontent.com';
        naverClientId = 'HAjQ7lH1Jk8PqJUeHajh';
    }

    return {
        API_BASE_URL: apiBaseUrl,
        S3_BASE_URL: s3BaseUrl,
        GOOGLE_CLIENT_ID: googleClientId,
        NAVER_CLIENT_ID: naverClientId,
    };
}

export const {
    API_BASE_URL,
    S3_BASE_URL,
    GOOGLE_CLIENT_ID,
    NAVER_CLIENT_ID,
} = getEnv(env);
