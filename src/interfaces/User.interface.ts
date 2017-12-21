import { Image } from '@/interfaces/Image.interface';

export interface User {
    id: string;
    email: string;
    nickname: string;
    status: string;
    profileImg: Image;
    newsletterAccepted?: number;
}

export interface UserSignupData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    termsOfServiceAccepted: boolean;
}
