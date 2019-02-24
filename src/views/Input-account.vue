<template>
    <section class="input account">
        <section>
            <h1 :title="`${bankName}을 선택하셨습니다.`">{{ bankName }}</h1>
            <form class="set">
                <ul>
                    <li>
                        <label for="accountNumber">계좌번호</label>
                        <input type="number"
                               id="accountNumber"
                               placeholder="숫자만 입력해 주세요."
                               pattern="\d*"
                               name="accountNumber"
                               v-model="accountNumber"
                               @keypress="validateAccountNumber($event)" />
                        <p>가상계좌 및 적금 펀드 계좌는 등록이 되지 않습니다.</p>
                    </li>
                    <li>
                        <span class="label">이름</span>
                        <span class="info">{{userName}}</span>
                    </li>
                </ul>
                <div class="btn-area">
                    <button type="button" class="confirm button" :disabled="isValueLengthLessThen10" @click="goCertificate()">확인</button>
                </div>
            </form>
        </section>


    </section>
</template>

<style lang="scss" scoped src="@/styles/input-account.scss"></style>

<script>
import { mapState } from 'vuex'

export default {
    name : 'Account',
    data : () => ({
        accountNumber : ''
    }),
    computed : {
        isValueLengthLessThen10 () {
            return this.accountNumber.length > 10 ? false : true
        },
        ...mapState({
            bankName : state => state.user.bankName,
            userName : state => state.user.name
        })
    },
    methods : {
        validateAccountNumber (event) {
            let code = event.which;

            if(code < 48 || code > 57){
                event.preventDefault();
            }
        },
        isDuplicateAccount () {
            let lists = this.$store.state.registed.list
            let bankCode = this.$store.state.user.bankCode
            for (let index in lists) {
                if (this.accountNumber === lists[index].accountNumber && bankCode === lists[index].bankCode) {
                    return true
                }
            }
        },
        goCertificate () {
            const isDuplicate = this.isDuplicateAccount();
            if (!isDuplicate) {
                this.$store.commit('setBankAccountNumber',this.accountNumber)
                this.$router.push('/identification')
            } else {
                alert('이미 등록된 계좌번호입니다.')
            }
        }
    },
    mounted () {
        if (!this.userName) {
            this.$router.replace('/')
        }
    },
    created () {
        this.accountNumber = (this.$store.state.user.accountNumber || '')
    }
}
</script>
