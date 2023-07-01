import type { RouterConfig } from '@nuxt/schema'
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
    routes: (_routes) => [
        {
            name: 'home',
            path: '/',
            component: () => import('~/pages/index.vue').then((r) => r.default || r),
        },
        {
            name: 'accounts',
            path: '/accounts',
            component: () => import('~/pages/accounts/accounts.vue'),
            children: [
                {
                    name: 'login',
                    path: 'login',
                    component: () => import('~/pages/accounts/login.vue'),
                },
                {
                    name: 'signup',
                    path: 'signup',
                    component: () => import('~/pages/accounts/signup.vue'),
                },
                {
                    name: 'signupTipster',
                    path: 'signup-tipster',
                    component: () => import('~/pages/accounts/signUpTipster.vue'),
                },
                {
                    name: 'tipster',
                    path: '',
                    component: () => import('~/pages/accounts/tipster.vue'),
                    children: [
                        {
                            name: 'tipster-home',
                            path: ':tipsterUsername',
                            component: () => import('~/pages/accounts/tipster/[tipsterUsername].vue'),
                        },
                        {
                            name: 'waiting-verification',
                            path: 'waiting-verification',
                            component: () => import('~/pages/accounts/tipster/waiting-verification.vue'),
                        },
                    ],
                },
            ],
        },
    ],
}
