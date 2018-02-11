const env = process.env.NODE_ENV;

interface ENV_CONFIG {
    API_BASE_URL: string;
    S3_BASE_URL: string;
}

function getEnv (env: string): ENV_CONFIG {
    let apiBaseUrl: string = '';
    let s3BaseUrl: string = '';

    if (env === 'production') {
        apiBaseUrl = 'https://api.pixelstairs.com/v1';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/pixelstairs';
    }
    else if (env === 'development') {
        apiBaseUrl = 'https://dev.api.pixelstairs.com/v1';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/dev.pixelstairs';
    }
    else if (env === 'local' || env === 'test') {
        apiBaseUrl = 'http://local.api.pixelstairs.com/v1';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/dev.pixelstairs';
    }

    return {
        API_BASE_URL: apiBaseUrl,
        S3_BASE_URL: s3BaseUrl,
    };
}

export const {
    API_BASE_URL,
    S3_BASE_URL,
} = getEnv(env);
