import { Store, ActionTree, ActionContext } from 'vuex';
import { AuthState } from './state';
import { User } from '@/interfaces/User.interface';
import Q from 'q';
import APIUser from '@/api/APIUser';

export function setToken(store: ActionContext<AuthState, any>, { accessToken, refreshToken }) {
    const defer = Q.defer();
    store.commit('SET_TOKEN', { accessToken, refreshToken });
    defer.resolve();
    return defer.promise;
}

export async function setUserByAPI(store: ActionContext<AuthState, any>) {
    const defer = Q.defer();
    try {
        const myDataResponse = await APIUser.getMyData();
        const myData = myDataResponse.result;
        store.commit('SET_USER', myData);
        defer.resolve();
    }
    catch (e) {
        console.error(e);
        defer.reject();
    }
    return defer.promise;
}

export function setUser(store: ActionContext<AuthState, any>, user: User) {
    let defer = Q.defer();
    store.commit('SET_USER', user);
    defer.resolve();
    return defer.promise;
}

export function destroyToken(store: ActionContext<AuthState, any>, { reload }) {
    let defer = Q.defer();
    store.commit('DESTROY_TOKEN', { reload });
    defer.resolve();
    return defer.promise;
}

export default <ActionTree<AuthState, any>> {
    setToken,
    setUserByAPI,
    setUser,
    destroyToken
}
