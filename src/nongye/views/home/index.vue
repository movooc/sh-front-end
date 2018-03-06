<template>
  <section class="home">
    {{ homeInfo }}
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
