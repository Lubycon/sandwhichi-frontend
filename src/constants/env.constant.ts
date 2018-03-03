const env = process.env.NODE_ENV;

interface ENV_CONFIG {
    API_BASE_URL: string;
    S3_BASE_URL: string;
    GOOGLE_CLIENT_ID: string;
}

function getEnv (env: string): ENV_CONFIG {
    let apiBaseUrl: string = '';
    let s3BaseUrl: string = '';
    let googleClientId: string = '';

    if (env === 'production') {
        apiBaseUrl = 'https://api.pixelstairs.com/v1';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/pixelstairs';
        googleClientId = "176918723618-lhbbbjhh6atn2pgao0tt1qvh832nrhe3.apps.googleusercontent.com";
    }
    else if (env === 'development') {
        apiBaseUrl = 'https://dev.api.pixelstairs.com/v1';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/dev.pixelstairs';
        googleClientId = "176918723618-lhbbbjhh6atn2pgao0tt1qvh832nrhe3.apps.googleusercontent.com";
    }
    else if (env === 'local' || env === 'test') {
        apiBaseUrl = 'http://local.api.pixelstairs.com/v1';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/dev.pixelstairs';
        googleClientId = "176918723618-lhbbbjhh6atn2pgao0tt1qvh832nrhe3.apps.googleusercontent.com";
    }

    return {
        API_BASE_URL: apiBaseUrl,
        S3_BASE_URL: s3BaseUrl,
        GOOGLE_CLIENT_ID: googleClientId,
    };
}

export const {
    API_BASE_URL,
    S3_BASE_URL,
    GOOGLE_CLIENT_ID,
} = getEnv(env);
