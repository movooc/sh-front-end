<template>
  <div class="app">
    <v-header></v-header>
    <div class="container clearfix">
      <div class="app-wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import VHeader from './components/header';

export default {
  components: {
    VHeader,
  },
  created() {
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  body
    margin: 0;
    background: #EFEFF4;
    font-family: "华文细黑", "Microsoft YaHei", "微软雅黑";
  .container
    margin: 0 auto;
    width: 1300px;
  .clearfix:after
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
</style>
