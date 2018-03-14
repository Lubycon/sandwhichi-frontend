import { Getter, GetterTree } from 'vuex';
import { AuthState } from './state';
import { User } from '@/interfaces/User.interface';

export function getToken (state: AuthState): string {
    return state.accessToken;
}

export function getNaverToken (state: AuthState): string {
    return state.naverAccessToken;
}

export function getGoogleToken (state: AuthState): string {
    return state.googleAccessToken;
}

export function isAuthorized (state: AuthState): boolean {
    return state.isAuthorized;
}

export function getUser (state: AuthState): User {
    return state.isAuthorized && state.user;
}

export function getUserProfileSrc (state: AuthState): string {
    return state.userProfileSrc;
}

export function hasProfileSrc (state: AuthState): boolean {
    return state.hasProfileSrc;
}

export default <GetterTree<AuthState, any>> {
    getToken,
    getNaverToken,
    getGoogleToken,
    getUser,
    getUserProfileSrc,
    isAuthorized,
    hasProfileSrc
}
