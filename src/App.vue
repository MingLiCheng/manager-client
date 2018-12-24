<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
  name:'App',
  created() {
    if(localStorage.getItem('eleToken')){
      const decode = jwt_decode(localStorage.getItem('eleToken'))
      //将token存储到vuex中
      this.$store.dispatch('setIsAuthenticated', !this.isEmpty(decode))
      this.$store.dispatch('setUser', decode)
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0 ) ||
        (typeof value === "string" && value.trim().length === 0)
      )
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    test() {
      // alert('1')
    }
  }
}
</script>

<style>
@import url('../static/comment/css/common.css');
html,
body,
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  width: 100%;
  height: 100%;
}
</style>
