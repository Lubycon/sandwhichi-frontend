import { Mutation, MutationTree } from 'vuex';
import { AuthState } from './state';
import { User } from '@/interfaces/User.interface';

import { APICore } from '@/api/APICore';
import Cookie from '@/helpers/Cookie';

export function SET_TOKEN (state: AuthState, { accessToken, refreshToken }) {
    state.accessToken = accessToken;
    state.refreshToken = refreshToken;
    APICore.setAuthToken(accessToken);
    APICore.setRefreshToken(refreshToken);
    Cookie.save({
        key: 'auth',
        value: accessToken,
    });
    Cookie.save({
        key: 'refresh',
        value: refreshToken,
    });
}

export function SET_USER (state: AuthState, user: User) {
    state.user = user;
    state.isAuthorized = true;
    Cookie.save({
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
    Cookie.clear('auth');
    Cookie.clear('refresh');
    Cookie.clear('user');
    if (process.browser && location && reload) {
        location.reload(true);
    }
}

export default <MutationTree<AuthState>> {
    SET_TOKEN,
    SET_USER,
    DESTROY_TOKEN
}
