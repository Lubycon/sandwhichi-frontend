import Q from 'q';
import { createApp } from './app';
import {
    DESTROY_AUTH_TOKEN,
    SET_MY_USER
} from '@/stores/auth/config';
import { APICore } from '@/api/APICore';

/* Global jQuery lib with expose-loader */
import 'expose-loader?$!expose-loader?jQuery!jquery';

const env = process.env.NODE_ENV;
const { app, router, store } = createApp();

/**
 * @async
 * @function init
 * @returns { Promise<void> }
 */
const init = async function () {
    const defer = Q.defer();
    /** @desc 운영환경에서의 콘솔 메소드 무시 */
    if (env === 'production') {
        if (!window.console) {
            window.console = {};
        }
        const methods = ['log', 'debug', 'warn', 'info'];
        methods.forEach(method => {
            console[method] = function () {};
        });
    }

    /** @desc 서버의 스토어의 클라이언트 스토어의 동기화 */
    if (window.__INITIAL_STATE__) {
        store.replaceState(window.__INITIAL_STATE__);
    }

    /** @desc 서버의 스토에서 토큰을 SET 했었는지 체크 후 유저 데이터 호출 */
    if (store.state.auth.authToken) {
        APICore.setAuthToken(store.state.auth.authToken);
        try {
            await store.dispatch(SET_MY_USER);
        }
        catch (e) {
            store.dispatch(DESTROY_AUTH_TOKEN);
        }
    }

    defer.resolve();
    return defer.promise;
};

router.onReady(async () => {
    await init();

    // asyncData를 위한 route 훅.
    // asyncData가 존재할 경우 이 호출이 완료된 후 route가 이동된다.，
    // 이전 라우트에서 가져온 중복 데이터는 다시 가져오지 않는다.
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to);
        const prevMatched = router.getMatchedComponents(from);
        let diffed = false;
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c));
        });
        if (!activated.length) {
            return next();
        }
        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to });
            }
        })).then(() => {
            /* LOADING INDICATOR */
            next();
        }).catch(next);
    });

    app.$mount('#app');
});
