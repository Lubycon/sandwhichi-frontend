const env = process.env.NODE_ENV;

interface ENV_CONFIG {
    API_BASE_URL: string;
    S3_BASE_URL: string;
    G_RECAPTCHA_KEY: string;
}

function getEnv (env: string): ENV_CONFIG {
    let apiBaseUrl: string = '';
    let s3BaseUrl: string = '';
    let gReCaptchaKey: string = '';

    if (env === 'production') {
        apiBaseUrl = 'https://api.pixelstairs.com/v1';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/pixelstairs';
        gReCaptchaKey = '6Lcdf0YUAAAAAICBNxMnocAXgye0dAaosWr1mnbw';
    }
    else if (env === 'development') {
        apiBaseUrl = 'https://dev.api.pixelstairs.com/v1';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/dev.pixelstairs';
        gReCaptchaKey = '6Lcdf0YUAAAAAICBNxMnocAXgye0dAaosWr1mnbw';
    }
    else if (env === 'local' || env === 'test') {
        apiBaseUrl = 'http://local.api.pixelstairs.com/v1';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/dev.pixelstairs';
        gReCaptchaKey = '6Lcdf0YUAAAAAICBNxMnocAXgye0dAaosWr1mnbw';
    }

    return {
        API_BASE_URL: apiBaseUrl,
        S3_BASE_URL: s3BaseUrl,
        G_RECAPTCHA_KEY: gReCaptchaKey,
    };
}

export const {
    API_BASE_URL,
    S3_BASE_URL,
    G_RECAPTCHA_KEY,
} = getEnv(env);
