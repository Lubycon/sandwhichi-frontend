const env = process.env.NODE_ENV;

interface ENV_CONFIG {
    API_BASE_URL: string;
    IMAGE_UPLOAD_LAMBDA: string;
    S3_BASE_URL: string;
    GOOGLE_CLIENT_ID: string;
    NAVER_CLIENT_ID: string;
    G_RECAPTCHA_KEY: string;
    GA_ID: string;
}

function getEnv (env: string): ENV_CONFIG {
    let apiBaseUrl: string = '';
    let imageUploadLambda = '';
    let s3BaseUrl: string = '';
    let googleClientId: string = '';
    let naverClientId: string = '';
    let gReCaptchaKey: string = '';
    let gaId: string = '';

    if (env === 'production') {
        apiBaseUrl = 'https://api.sandwhichi.com/v1';
        imageUploadLambda = 'https://igo4lrrvwe.execute-api.ap-northeast-2.amazonaws.com/dev/images/ ';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/sandwhichi';
        googleClientId = '910544055896-tiucajkqq3pt6l38v7kge5h6q20cs3ai.apps.googleusercontent.com';
        naverClientId = 'HAjQ7lH1Jk8PqJUeHajh';
        gReCaptchaKey = '6Lcdf0YUAAAAAICBNxMnocAXgye0dAaosWr1mnbw';
        gaId = 'UA-112072597-1';
    }
    else if (env === 'development') {
        apiBaseUrl = 'https://dev.api.sandwhichi.com/v1';
        imageUploadLambda = 'https://igo4lrrvwe.execute-api.ap-northeast-2.amazonaws.com/dev/images/ ';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/dev.sandwhichi';
        googleClientId = '910544055896-tiucajkqq3pt6l38v7kge5h6q20cs3ai.apps.googleusercontent.com';
        naverClientId = 'HAjQ7lH1Jk8PqJUeHajh';
        gReCaptchaKey = '6Lcdf0YUAAAAAICBNxMnocAXgye0dAaosWr1mnbw';
        gaId = 'UA-112072597-1';
    }
    else if (env === 'local' || env === 'test') {
        apiBaseUrl = 'http://local.sandwhichi.com:8081';
        imageUploadLambda = 'https://igo4lrrvwe.execute-api.ap-northeast-2.amazonaws.com/dev/images/';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/dev.sandwhichi';
        googleClientId = '910544055896-tiucajkqq3pt6l38v7kge5h6q20cs3ai.apps.googleusercontent.com';
        naverClientId = 'HAjQ7lH1Jk8PqJUeHajh';
        gReCaptchaKey = '6Lcdf0YUAAAAAICBNxMnocAXgye0dAaosWr1mnbw';
        gaId = 'UA-112072597-1';
    }

    return {
        API_BASE_URL: apiBaseUrl,
        IMAGE_UPLOAD_LAMBDA: imageUploadLambda,
        S3_BASE_URL: s3BaseUrl,
        GOOGLE_CLIENT_ID: googleClientId,
        NAVER_CLIENT_ID: naverClientId,
        G_RECAPTCHA_KEY: gReCaptchaKey,
        GA_ID: gaId,
    };
}

export const {
    API_BASE_URL,
    IMAGE_UPLOAD_LAMBDA,
    S3_BASE_URL,
    GOOGLE_CLIENT_ID,
    NAVER_CLIENT_ID,
    G_RECAPTCHA_KEY,
    GA_ID,
} = getEnv(env);
