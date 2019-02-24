import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/Index.vue'
import SelectBank from './views/Select-bank.vue'
import InputAccount from './views/Input-account.vue'
import Identification from './views/Identification.vue'
import Ars from './views/Ars.vue'
import Result from './views/Result.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'index',
            component : Index
        },
        {
            path: '/select-bank',
            name : 'select-bank',
            component : SelectBank
        },
        {
            path: '/input-account',
            name: 'input-account',
            component : InputAccount
        },
        {
            path: '/identification',
            name: 'identification',
            component : Identification
        },
        {
            path: '/ars',
            name: 'ars',
            component : Ars
        },
        {
            path : '/result',
            name : 'result',
            component : Result
        }
    ]
})
