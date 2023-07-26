import type { RouterConfig } from '@nuxt/schema';
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
    routes: (_routes) => [
        {
            name: 'home',
            path: '/',
            component: () =>
                import('~/pages/index.vue').then((r) => r.default || r),
        },
        {
            name: 'accounts',
            path: '/accounts',
            component: () => import('~/pages/accounts/accounts.vue'),
            children: [
                {
                    name: 'login',
                    path: 'login',
                    component: () => import('~/pages/accounts/auths/login.vue'),
                },
                {
                    name: 'signup',
                    path: 'signup',
                    component: () => import('~/pages/accounts/auths/signup.vue'),
                },
                {
                    name: 'signupTipster',
                    path: 'signup-tipster',
                    component: () =>
                        import('~/pages/accounts/auths/signUpTipster.vue'),
                },
                {
                    name: 'waiting-verification',
                    path: 'waiting-verification',
                    component: () =>
                        import('~/pages/accounts/waiting-verification.vue'),
                },
                {
                    name: 'tipster',
                    path: 'tipster',
                    component: () => import('~/pages/accounts/tipster.vue'),
                    children: [
                        {
                            name: 'tipster-home',
                            path: '@:tipsterUsername',
                            component: () =>
                                import(
                                    '~/pages/accounts/tipster/@[tipsterUsername].vue'
                                ),
                        },
                    ],
                },
                {
                    name: 'users',
                    path: '',
                    component: () => import('~/pages/accounts/users.vue'),
                    children: [
                        {
                            name: 'user-home',
                            path: ':userName',
                            component: () =>
                                import('~/pages/accounts/users/@[userName].vue'),
                        },
                    ],
                },
            ],
        },
    ],
};
