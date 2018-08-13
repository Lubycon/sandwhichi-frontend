import { ActionTree, ActionContext } from 'vuex';
import { AuthState } from './state';
import {
    SET_AUTH_TOKEN,
    DESTROY_AUTH_TOKEN,
    SET_MY_USER,
    DESTROY_MY_USER
} from './config';
import { User } from '@/interfaces/User.interface';
import APIUser from '@/api/APIUser';

const actions = <ActionTree<AuthState, any>> {
    [SET_AUTH_TOKEN] (store: ActionContext<AuthState, any>, accessToken: string) {
        store.commit(SET_AUTH_TOKEN, accessToken);
    },
    async [SET_MY_USER] (store: ActionContext<AuthState, any>) {
        try {
            const myDataResponse = await APIUser.getMyData();
            const myUserData: User = myDataResponse.results;
            store.commit(SET_MY_USER, myUserData);
            return myUserData;
        }
        catch (e) {
            console.error(e);
            throw new Error(e);
        }
    },
    [DESTROY_AUTH_TOKEN] (store: ActionContext<AuthState, any>, reload: boolean) {
        store.commit(DESTROY_AUTH_TOKEN, reload);
    },
    [DESTROY_MY_USER] (store: ActionContext<AuthState, any>) {
        store.commit(DESTROY_MY_USER);
    },
};

export default actions;
