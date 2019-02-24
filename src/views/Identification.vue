<template>
    <section class="identification">
        <h1>출금이체 동의를 위한 인증입니다.</h1>
        <form class="set">
            <ul>
                <li>
                    <span class="label">통신사</span>
                    <div>
                        <input type="radio" name="carrier" id="skt" value="skt" v-model.lazy="user.carrier"/>
                        <label for="skt">SKT</label>

                        <input type="radio" name="carrier" id="kt" value="kt" v-model.lazy="user.carrier"/>
                        <label for="kt">KT</label>

                        <br />

                        <input type="radio" name="carrier" id="lgt" value="lgt"  v-model.lazy="user.carrier"/>
                        <label for="lgt">LGU+</label>

                        <input type="radio" name="carrier" id="mvno" value="mvno" v-model.lazy="user.carrier"/>
                        <label for="mvno">알뜰폰</label>
                    </div>
                </li>
                <li>
                    <label for="">휴대폰번호</label>
                    <input type="number" pattern="\d*" placeholder="숫자만 입력해주세요." v-model="user.phoneNumber" @blur="checkPhoneNumber($event)">
                    <p v-if="!validate.phoneNumber">전화번호의 형식이 일치하지 않습니다.</p>
                </li>
                <li>
                    <label for="">국적</label>
                    <div>
                        <input type="radio" name="nation" id="local" value="local" v-model.lazy="user.nation" />
                        <label for="local">내국인</label>

                        <input type="radio" name="nation" id="foreigner" value="foreign" v-model.lazy="user.nation" />
                        <label for="foreigner">외국인</label>
                    </div>
                </li>
            </ul>
        </form>
        <p class="notice">
            아래 버튼을 누르면 입력한 번호로 전화가 연결됩니다.
        </p>
        <p class="notice alert">
            데모 데이터는<br/> skt / 01012341234 / 내국인만 통과합니다.
        </p>
        <div class="btn-area">
            <button type="button" class="get ars confirm button" :disabled="isValidatedAllFalse" @click="callArs()">ARS인증 전화 받기</button>
        </div>
    </section>
</template>

<style lang="scss" scoped src="@/styles/indetification.scss"> </style>

<script>
export default {
    // !!!! vuex에서 값을 검사해서 없으면 튕겨내야된다.
    name : 'Identification',
    data : () => ({
        user : {
            carrier : '',
            nation : '',
            phoneNumber : '',
            accountNumber : ''
        },
        validate : {
            phoneNumber : true
        }
    }),
    computed : {
        isValidatedAllFalse () {
            return this.user.carrier && this.user.nation && this.validate.phoneNumber ?  false : true
        }
    },
    methods : {
        checkPhoneNumber (event) {
            let value = event.target.value
            return this.validate.phoneNumber = /^01[01789]\d{7,8}$/.test(value) ? true : false
        },
        callArs () {
            const api = this.$store.state.api
            this.$http.post(`${api}/checkUserId`,this.user).then( (response) => {
                let res = response.data
                console.log(response.data)

                if (res.success === true) {
                    this.storeIdentificationInfo()
                    this.$router.push('/ars')
                } else {
                    alert(res.message)
                }

            })
        },
        storeIdentificationInfo () {
            this.$store.commit('setPhone',this.user)
        }
    },
    created () {
        // 기초 데이터 셋업
        if (!this.$store.state.user.accountNumber) {
            this.$router.replace('/')
        } else {
            this.user.accountNumber = this.$store.state.user.accountNumber
        }

        this.user = this.$store.state.user
    }
}
</script>
