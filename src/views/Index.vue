<template>
    <section class="index">
        <h1>계좌 등록</h1>
        <div class="account status" v-if="!!lists.length">
            <!-- 나중에 등록계좌를 vuex에서 받아와야 한다. -->
            <h2>등록계좌 {{lists.length}}개</h2>
            <ul>
                <li :key="list.id" v-for="list in lists">
                    {{list.name}}<br>
                    {{list.accountNumber}}
                </li>
            </ul>
        </div>
        <div class="account status" v-else>
            <h2>계좌를 등록해주세요</h2>
        </div>
        <div class="btn-area">
            <router-link class="confirm button" to="/select-bank" >계좌 등록</router-link>
        </div>
    </section>
</template>

<style lang="scss" scoped src="@/styles/index.scss"></style>

<script>
import { mapState } from 'vuex'

export default {
    name : 'Index',
    computed : mapState({
        lists : state => state.registed.list
    })
}
</script>
