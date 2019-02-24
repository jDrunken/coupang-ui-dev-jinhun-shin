import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const init = {
    name : '',
    age : 0,
    bankName : '',
    bankcode : '',
    accountNumber : '',
    carrier : '',
    nation : '',
    phoneNumber : ''
}

const state = () => ({      // 상태를 관리한다. data 와 같다고 이해중.
    api : 'http://localhost:4000',
    user :  {
        name : '',
        age : 0,
        bankName : '',
        bankCode : '',
        accountNumber : '',
        carrier : '',
        nation : '',
        phoneNumber : ''
    },
    registed : {
        just : {},
        list : []
    }
})

// ------------------------------------------------------------


const mutations = {         // methods 와 같다.
    setUser (state,user) {
        state.user = user
    },
    setBank (state,data) {
        state.user['bankName'] = data.name;
        state.user['bankCode'] = data.code;
    },
    setBankAccountNumber (state,accountNumber) {
        state.user.accountNumber = accountNumber
    },
    setPhone (state,data) {
        state.user['carrier'] = data.carrier;
        state.user['nation'] = data.nation;
        state.user['phoneNumber'] = data.phoneNumber
    },
    setRegisted (state) {
        state.registed.just = {
            name : state.user.bankName,
            accountNumber : state.user.accountNumber
        }

        state.registed.list.push({
            bankCode : state.user.bankCode,
            name : state.user.bankName,
            accountNumber : state.user.accountNumber
        })
    },
    init (state) {
        state.user = init
        state.registed.just = {}
    }
}


export default new Vuex.Store({
    state,
    mutations,
})
