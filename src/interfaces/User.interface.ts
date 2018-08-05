import { Image } from '@/interfaces/Image.interface';

export type UserProfile = {
    abilities: string[],
    keywords: string[],
    profile_image: string,
}

export type User = {
    id: string;
    email: string;
    username: string;
    profile?: UserProfile,
};

export type UserSignupData = {
    email: string;
    password: string;
    username: string;
    has_privacy_policy: boolean;
    has_terms: boolean;
    email_accepted: boolean;
};

export type UserSigninData = {
    email: string;
    password: string;
};

export type UserSigndropData = {
    answerIds: number[]
};
