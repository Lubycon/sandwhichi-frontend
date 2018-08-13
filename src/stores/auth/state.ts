import { User } from '@/interfaces/User.interface';
import { DEFAULT_USER_PROFILE } from '@/constants';

export class AuthState {
    public me: User;
    public myProfileSrc: string;
    public authToken: string;
    public isAuthorized: boolean;
    public hasProfileSrc: boolean;

    constructor () {
        this.me = null;
        this.myProfileSrc = DEFAULT_USER_PROFILE;
        this.authToken = null;
        this.isAuthorized = false;
        this.hasProfileSrc = false;
    }
}
