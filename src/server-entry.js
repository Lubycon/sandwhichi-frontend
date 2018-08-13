import { createApp } from '@/app';
import Cookie from '@/helpers/Cookie.ts';
import {
    SET_AUTH_TOKEN,
    DESTROY_AUTH_TOKEN
} from '@/stores/auth/config';

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();

        /** @desc 페이지 메타태크 삽입 */
        const meta = app.$meta();
        context.meta = meta;

        const AUTH_KEY = Cookie.encodeKey('auth');
        const ENCODED_AUTH_TOKEN = context.cookie[AUTH_KEY];
        const next = () => {
            router.push(context.url);
        };

        if (ENCODED_AUTH_TOKEN) {
            const TOKEN = Cookie.decode(ENCODED_AUTH_TOKEN);
            store.dispatch(SET_AUTH_TOKEN, TOKEN);
        }
        else {
            store.dispatch(DESTROY_AUTH_TOKEN);
        }

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                return reject({
                    code: 404,
                    msg: `${router.currentRoute.fullPath} is not found`,
                });
            }
            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute,
                    });
                }
            })).then(() => {
                /*
                 * 모든 프리 페치 후크가 해결 된 후 저장소가 렌더링 응용 프로그램에 필요한 상태로 채워집니다.
                 * 컨텍스트에 상태를 첨부하고 렌더러에`template` 옵션을 사용하면 상태는
                 * 자동으로`window .__ INITIAL_STATE__`로 직렬화되어 HTML에 주입됩니다.
                 */
                context.state = store.state;
                resolve(app);
            }).catch(reject);
        }, reject);

        /** @desc 라우터 이동 */
        next();
    });
};
