<template>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  created () {
    // 컴포넌트 렌더링이 되었을 때,
    // console.log("리다이렉트 페이지 진입");
    // 쿼리스트링으로부터 토큰을 획득
    const token = this.$route.query.token
    // console.log('token', token)

    // 토큰이 존재하는 경우, Vuex Store에 토큰을 저장한다.
    if (token) {
      this.$store.commit('user/loginToken', token);
      alert("로그인 성공")
    }

    // 토큰이 있던 없던, 루트 페이지로 이동한다.
    this.$router.replace('/')
  },
  methods: {
    
  }
}
</script>
