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
    nickname: string;
    termsOfServiceAccepted: boolean;
    newsletterAccepted: boolean;
}

export interface UserSigninData {
    email: string;
    password: string;
}

export interface UserSigndropData {
    answerIds: number[]
}
