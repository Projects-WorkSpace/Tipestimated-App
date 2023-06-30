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
            ],
        },
        {
            name: 'tipster',
            path: '/tipster',
            component: () => import('~/pages/tipster/index.vue'),
        },
    ],
}
