import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store/index'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '@/views/About.vue')
    },
    {
        path: '/listview',
        name: 'ListView',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '@/views/ListView.vue')
    }, {
        path: '/searchView',
        name: 'searchView',
        component: () =>
            import ('@/views/Search.vue')
    }, {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/Login.vue')
    }, {
        path: '/personal',
        name: 'personal',
        beforeEnter: (to, from, next) => {
            if (store.state.user.isLogin) {
                next()
            } else {
                next("/login")
            }
        },
        component: () =>
            import ('@/views/Personal.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router