<template>
    <section class="ars">
        <transition name="fade">
            <section class="calling" v-if="isCallingView">
                <h1>ARS인증 전화 요청중입니다.</h1>
            </section>
        </transition>
        <section class="identify">
            <h1>
                ARS 통화종료 후 <br />
                <strong>'확인'</strong> 버튼을 누르면 인증이 완료됩니다.
            </h1>
            <p class="notice">
                통화가 수신되지 않거나<br />
                통신사/휴대폰 번호를 변경해야 할 경우<br />
                <strong>ARS 재인증</strong> 버튼을 눌러 주세요.
            </p>
            <div class="btn-area">
                <router-link to="/identification" class="reaction button" @click="goArs()">ARS 재인증</router-link>
                <router-link to="/result" class="confirm button" @click.native="goResult()">확인</router-link>
            </div>
        </section>
    </section>
</template>

<style lang="scss" scoped src="@/styles/ars.scss"></style>

<style lang="scss" scoped>
// 화면 변환
.fade-leave-active {
    transition: opacity 1s, transform 0.5s;
}
.fade-leave-to {
    transform:scale(0.95);
    opacity: 0;
}
</style>

<script>
export default {
    name :'Ars',
    data : () => ({
        isCallingView : true
    }),
    methods : {
        enterConfirmView () {
            setTimeout( () => {
                this.isCallingView = false
            },200)
        },
        goResult () {
            // 세가지 값을 가지고 와서 뭉쳐야 되겠는데..
            this.$store.commit('setRegisted')
        }
    },
    created () {
        if (!this.$store.state.user.name) {
            this.$router.replace('/')
        }
    },
    mounted () {
        this.enterConfirmView()
    }
}
</script>
