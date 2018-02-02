import { DEFAULT_USER_PROFILE } from '@/constants';
import { Image } from '@/interfaces/Image.interface';

class ImageService {
    defaultUserProfile: string;

    constructor (DEFAULT_USER_PROFILE: string) {
        this.defaultUserProfile = DEFAULT_USER_PROFILE;
    }

    getResolution (img: Image, resolution: number = 1920) {
        if (!img) {
            return false;
        }

        if (img.isPixelOwn) {
            return img.file + resolution;
        }
        else {
            return img.file;
        }
    }

    getUserProfile (img: Image, resolution: number = 320) {
        if (!img) {
            return this.defaultUserProfile;
        }
        else {
            return this.getResolution(img, resolution);
        }
    }
}

const instance = new ImageService(DEFAULT_USER_PROFILE);
export default instance;
