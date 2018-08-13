import { GetterTree } from 'vuex';
import { AuthState } from './state';
import {
    GET_AUTH_TOKEN,
    GET_IS_AUTHORIZED,
    GET_MY_USER,
    GET_MY_USER_PROFILE_SRC,
    HAS_MY_USER_PROFILE_SRC
} from './config';
import { User } from '@/interfaces/User.interface';

const getters = <GetterTree<AuthState, any>> {
    [GET_AUTH_TOKEN] (state: AuthState): string {
        return state.authToken;
    },
    [GET_IS_AUTHORIZED] (state: AuthState): boolean {
        return state.isAuthorized;
    },
    [GET_MY_USER] (state: AuthState): User {
        return state.isAuthorized && state.me;
    },
    [GET_MY_USER_PROFILE_SRC] (state: AuthState): string {
        return state.myProfileSrc;
    },
    [HAS_MY_USER_PROFILE_SRC] (state: AuthState): boolean {
        return !!state.myProfileSrc;
    },
};

export default getters;
