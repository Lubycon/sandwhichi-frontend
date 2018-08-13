import { MutationTree } from 'vuex';
import { AuthState } from './state';
import {
    SET_AUTH_TOKEN,
    DESTROY_AUTH_TOKEN,
    SET_MY_USER
} from './config';
import { User } from '@/interfaces/User.interface';
import { APICore } from '@/api/APICore';
import Cookie from '@/helpers/Cookie';

declare var process; // 임시방편, 지울 것 @evan

const mutations = <MutationTree<AuthState>> {
    [SET_AUTH_TOKEN] (state: AuthState, authToken: string) {
        state.authToken = authToken;
        APICore.setAuthToken(authToken);
        Cookie.save({
            key: 'auth',
            value: authToken,
        });
    },
    [SET_MY_USER] (state: AuthState, me: User) {
        state.me = me;
        state.isAuthorized = true;
        if (me.profile.profile_image) {
            state.myProfileSrc = me.profile.profile_image;
            state.hasProfileSrc = true;
        }
    },
    [DESTROY_AUTH_TOKEN] (state: AuthState, reload: boolean) {
        state.authToken = null;
        state.me = {
            id: null,
            email: null,
            username: null,
            profile: {
                abilities: [],
                keywords: [],
                profile_image: null,
            },
        };
        state.isAuthorized = false;
        APICore.destroyToken();
        Cookie.clear('auth');
        if (process.browser && location && reload) {
            location.reload(true);
        }
    },
};

export default mutations;
