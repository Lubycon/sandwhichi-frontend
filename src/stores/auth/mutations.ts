import { Mutation, MutationTree } from 'vuex';
import { AuthState } from './state';
import { User } from '@/interfaces/User.interface';

import { APICore } from '@/api/APICore';
import CookieService from '@/services/Cookie.service';

export function SET_TOKEN (state: AuthState, { accessToken, refreshToken }) {
    state.accessToken = accessToken;
    state.refreshToken = refreshToken;
    APICore.setAuthToken(accessToken);
    APICore.setRefreshToken(refreshToken);
    CookieService.save({
        key: 'auth',
        value: accessToken,
    });
    CookieService.save({
        key: 'refresh',
        value: refreshToken,
    });
}

export function SET_USER (state: AuthState, user: User) {
    state.user = user;
    state.isAuthorized = true;
    CookieService.save({
        key: 'user',
        value: user,
    });

    if(user.profileImg) {
        state.userProfileSrc = user.profileImg.file + '320';
        state.hasProfileSrc = true;
    }
}
declare var process; // 임시방편, 지울 것 @evan

export function DESTROY_TOKEN (state: AuthState, { reload }) {
    state.accessToken = null;
    state.refreshToken = null;
    state.user = {
        id: null,
        email: null,
        nickname: null,
        status: null,
        profileImg: null,
    };
    state.isAuthorized = false;
    APICore.destroyToken();
    CookieService.clear('auth');
    CookieService.clear('refresh');
    CookieService.clear('user');
    if (process.browser && location && reload) {
        // location.reload('/');
    }
}

export default <MutationTree<AuthState>> {
    SET_TOKEN,
    SET_USER,
    DESTROY_TOKEN
}
