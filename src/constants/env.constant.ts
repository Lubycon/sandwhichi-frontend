const env = process.env.NODE_ENV;

interface ENV_CONFIG {
    API_BASE_URL: string;
    S3_BASE_URL: string;
    G_RECAPTCHA_KEY: string;
    GA_ID: string;
}

function getEnv (env: string): ENV_CONFIG {
    let apiBaseUrl: string = '';
    let s3BaseUrl: string = '';
    let gReCaptchaKey: string = '';
    let gaId: string = '';

    if (env === 'production') {
        apiBaseUrl = 'https://api.sandwhichi.com/v1';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/sandwhichi';
        gReCaptchaKey = '6Lcdf0YUAAAAAICBNxMnocAXgye0dAaosWr1mnbw';
        gaId = 'UA-112072597-1';
        
    }
    else if (env === 'development') {
        apiBaseUrl = 'https://dev.api.sandwhichi.com/v1';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/dev.sandwhichi';
        gReCaptchaKey = '6Lcdf0YUAAAAAICBNxMnocAXgye0dAaosWr1mnbw';
        gaId = 'UA-112072597-1';
    }
    else if (env === 'local' || env === 'test') {
        apiBaseUrl = 'http://local.api.sandwhichi.com/v1';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/dev.sandwhichi';
        gReCaptchaKey = '6Lcdf0YUAAAAAICBNxMnocAXgye0dAaosWr1mnbw';
        gaId = 'UA-112072597-1';
    }

    return {
        API_BASE_URL: apiBaseUrl,
        S3_BASE_URL: s3BaseUrl,
        G_RECAPTCHA_KEY: gReCaptchaKey,
        GA_ID: gaId,
    };
}

export const {
    API_BASE_URL,
    S3_BASE_URL,
    G_RECAPTCHA_KEY,
    GA_ID,
} = getEnv(env);
