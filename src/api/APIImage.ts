/**
 * @class APIImage
 * @desc 이미지 관련 API 모귤
 */
import { APICore } from '@/api/APICore';
import {
    API_BASE_URL,
    IMAGE_UPLOAD_LAMBDA
} from '@/constants/env.constant';

class APIImage extends APICore {
    constructor () {
        super({
            baseURL: API_BASE_URL,
        });
    }

    public postImage (file: File): Promise<any> {
        const endpoint = IMAGE_UPLOAD_LAMBDA;
        const formData = new FormData();
        formData.append('image', file);
        return this.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data; charset=utf-8; boundary=__X_PAW_BOUNDARY__',
            },
        });
    }
}

const instance = new APIImage();
export default instance;
