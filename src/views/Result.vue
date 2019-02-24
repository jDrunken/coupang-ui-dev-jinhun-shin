<template>
    <section class="result">
        <div class="registed account">
            <p>{{bank.name}}</p>
            <p>{{bank.accountNumber}}</p>
        </div>
        <h1>계좌 등록완료</h1>
        <div class="btn-area">
            <router-link class="confirm button" to="/" @click.native="init()">확인</router-link>
        </div>
    </section>
</template>

<style lang="scss" scoped src="@/styles/result.scss">
</style>

<script>
export default {
    name :'Result',
    computed : {
        bank () {
            return this.$store.state.registed.just
        }
    },
    methods : {
        init () {
            this.$store.commit('init')
        }
    },
    created () {
        if (!this.$store.state.user.name) {
            this.$router.replace('/')
        }
    }
}
</script>
