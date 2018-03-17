import { Image } from '@/interfaces/Image.interface';

export interface User {
    id: string;
    email: string;
    name: string;
    status: string;
    profileImg: Image;
    newsletterAccepted?: number;
}

export interface UserSignupData {
    email: string;
    password: string;
    name: string;
    privacyPolicyAccepted: boolean;
    termsOfServiceAccepted: boolean;
    emailAccepted: boolean;
}

export interface GoogleUserSignupData {
    email: string;
    password: string;
    name: string;
    privacyPolicyAccepted: boolean;
    termsOfServiceAccepted: boolean;
    emailAccepted: boolean;
    id_token: string;
}

export interface NaverUserSignupData {
    email: string;
    password: string;
    name: string;
    privacyPolicyAccepted: boolean;
    termsOfServiceAccepted: boolean;
    emailAccepted: boolean;
    accessToken: string;
}

export interface UserSigninData {
    email: string;
    password: string;
}

export interface UserSigndropData {
    answerIds: number[]
}
