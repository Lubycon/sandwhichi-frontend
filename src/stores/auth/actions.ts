import { Store, ActionTree, ActionContext } from 'vuex';
import { AuthState } from './state';
import { User } from '@/interfaces/User.interface';
import Q from 'q';
import APIService from '@/services/API.service';

export function setToken(store: ActionContext<AuthState, any>, { accessToken, refreshToken }) {
    let defer = Q.defer();
    store.commit('SET_TOKEN', { accessToken, refreshToken });
    defer.resolve();
    return defer.promise;
}

export function setUserByAPI(store: ActionContext<AuthState, any>) {
    let defer = Q.defer();
    APIService.resource('users.me').get()
    .then(res => {
        console.log('setUser => ', res);
        let user = res.result;
        store.commit('SET_USER', user);
        defer.resolve();
    }, err => {
        if (err) {
            console.error(err);
        }
        defer.reject();
    });

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
