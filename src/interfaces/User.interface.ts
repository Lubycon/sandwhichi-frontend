import { Image } from '@/interfaces/Image.interface';

export type User = {
    id: string;
    email: string;
    name: string;
    status: string;
    profileImg: Image;
    newsletterAccepted?: number;
};

export type UserSignupData = {
    email: string;
    password: string;
    name: string;
    privacyPolicyAccepted: boolean;
    termsOfServiceAccepted: boolean;
    emailAccepted: boolean;
};

export type GoogleUserSignupData = {
    email: string;
    password: string;
    name: string;
    privacyPolicyAccepted: boolean;
    termsOfServiceAccepted: boolean;
    emailAccepted: boolean;
    id_token: string;
};

export type NaverUserSignupData = {
    email: string;
    password: string;
    name: string;
    privacyPolicyAccepted: boolean;
    termsOfServiceAccepted: boolean;
    emailAccepted: boolean;
    accessToken: string;
};

export type UserSigninData = {
    email: string;
    password: string;
};

export type UserSigndropData = {
    answerIds: number[]
};
