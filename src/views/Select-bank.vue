<template>
    <section class="select bank">
        <h1>은행 선택</h1>
        <h2>사용할 은행을 선택하세요.</h2>
        <ul :key="bank.id" v-for="bank in banks">
            <li><button type="button" @click="selectBank(bank.bankName,bank.bankCode)">{{bank.bankName}}</button></li>
        </ul>
    </section>
</template>

<style lang="scss" scoped src="@/styles/select-bank.scss"></style>

<script>
export default {
    name:'SelectBank',
    data : () => ({
        banks : []
    }),
    methods : {
        selectBank (name,code) {
            // vuex에 데이터 저장
            this.$store.commit('setBank',{name,code});

            // 다음 화면
            this.$router.push('/input-account')
        },
        getBankData () {
            const api = this.$store.state.api
            this.$http.get(`${api}/bankList`).then((result) =>{
                if (result.status !== 200 || result.statusText !== 'OK') {
                    alert('데이터를 가져올 수 없습니다.\n 잠시 후 다시 접속해주세요.')
                }

                // 은행 리스트를 저장
                this.banks = result.data.content.bankList

                // vuex에 이름과 나이를 저장한다.
                const user = result.data.content.user
                this.$store.commit('setUser', user)
            })
        }
    },
    created () {
        this.getBankData()
    },
}
</script>
