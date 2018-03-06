<template>
  <section class="home">
    {{ homeInfo }}
    <router-link to="/page">点击进入页面</router-link>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default{
    name: 'home',
    computed: {
      ...mapGetters({
        homeInfo: 'getHomeInfo',
      })
    },
    created() {
    },
    methods: {
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
