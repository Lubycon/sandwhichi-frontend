import { User } from '@/interfaces/User.interface';
import { DEFAULT_USER_PROFILE } from '@/constants';

export class AuthState {
    public user: User;
    public userProfileSrc: string;
    public accessToken: string;
    public refreshToken: string;
    public isAuthorized: boolean;
    public hasProfileSrc: boolean;

    constructor () {
        this.user = null;
        this.userProfileSrc = DEFAULT_USER_PROFILE;
        this.accessToken = null;
        this.refreshToken = null;
        this.isAuthorized = false;
        this.hasProfileSrc = false;
    }
}
