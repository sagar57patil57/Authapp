<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p>hi {{ email }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    email() {
      if(this.$store.state.user.email == null){
        return false
      }
      else{
        return this.$store.state.user.email
      }
    }
  },

  created() {
    this.$store.dispatch('fetchUser')
  }
}
</script>

<style scoped>
  h1, p {
    text-align: center;
  }

  p {
    color: red;
  }
</style>