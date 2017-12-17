import { Getter, GetterTree } from 'vuex';
import { AuthState } from './state';
import { User } from '@/interfaces/User.interface';

export function getToken (state: AuthState): string {
    return state.accessToken;
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
    getUser,
    getUserProfileSrc,
    isAuthorized,
    hasProfileSrc
}
