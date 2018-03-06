<template>
  <ul>
    <li v-for="(list, index) in prepareList">
      <span>No.{{++index}}</span>
      <!--<p v-text="list.tms"></p>-->
      <div class="audio" v-if="list.type == 'audio'">
        <v-audio :id="list.seqno" :src="list.content"></v-audio>
        <p class="note" v-if="list.note" v-text="list.note" :title="list.note" @click="showNote(list.note)"></p>
      </div>
      <div class="image" v-if="list.type == 'image'">
        <a :href="list.content" target="view_window">
          <img :src="list.content" />
        </a>
      </div>
      <div class="video" v-if="list.type == 'video'">
        <video :src="list.content" controls="controls">
          您的浏览器不支持 video 标签。
        </video>
      </div>
      <div class="text" v-if="list.type == 'text'" v-html="textFormat(list.content)"></div>
      <div class="handle">
        <span class="disabled" v-if="index == 1"><i class="iconfont icon-shangyi"></i></span>
        <span class="cursor-pointer" title="上移" @click="handUp(index)" v-if="index > 1"><i class="iconfont icon-shangyi"></i></span>
        <span class="disabled" v-if="index >= prepareList.length"><i class="iconfont icon-xiayi"></i></span>
        <span class="cursor-pointer" title="下移" @click="handDown(index)" v-if="index < prepareList.length"><i class="iconfont icon-xiayi"></i></span>
        <span class="cursor-pointer" title="移动" @click="handInsert(index)"><i class="iconfont icon-charu"></i></span>
        <span class="cursor-pointer" title="删除" @click="handDelete(index)"><i class="iconfont icon-105"></i></span>
      </div>
    </li>
  </ul>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex';
  import { trimStr } from '@lib/js/mUtils';
  import vAudio from '@teacher/views/prepare/audio.vue';

  // 定义滚动DOM
  let prepareScroll = null;
  let scrollTop     = null;

  export default
  {
    name: 'v-prepare',
    props: {
      prepareList: {
        type: null
      }
    },
    components: {
      vAudio
    },
    computed: {
      ...mapGetters([
      ])
    },
    data() {
      return {
        lesson_sn: ''
      };
    },
    created() {
      // 获取lesson_sn
      let params = this.$route.params;
      this.lesson_sn = params.lesson_sn;
    },
    methods: {
      handSwap(index_a, index_b, callback) {
        let cursor = {
          cursor_a: this.prepareList[--index_a].seqno,
          cursor_b: this.prepareList[--index_b].seqno,
        };
        // 交换记录
        this.$store.dispatch('fetchPrepareSwap',{lesson_sn:this.lesson_sn, ...cursor}).then((data) => {
          // 交换记录
          callback();
        }, (err) => {
          swal({
            title: '错误提醒',
            text: err.message,
            confirmButtonText: "知道了"
          });
        });
      },
      handJump(index_a, index_b, callback) {
        let cursor = {
          cursor: this.prepareList[--index_a].seqno,
          before: this.prepareList[--index_b].seqno,
        };
        // 交换记录
        this.$store.dispatch('fetchPrepareJump',{lesson_sn:this.lesson_sn, ...cursor}).then((data) => {
          // 交换记录
          callback(data);
        }, (err) => {
          swal({
            title: '错误提醒',
            text: err.message,
            confirmButtonText: "知道了"
          });
        });
      },
      handUp(index) {
        let up_index = index - 1;
        // 上移
        this.handSwap(index, up_index, ()=>{
          //this.$router.go(0);
          let newList = [...this.prepareList];
          // 记住位置
          this.recordScrollTop();
          //
          this.swapList(newList, index-1, up_index-1);
        });
      },
      handDown(index) {
        // 下移
        let down_index = index + 1;
        // 上移
        this.handSwap(index, down_index, ()=>{
          //this.$router.go(0);
          let newList = [...this.prepareList];
          // 记住位置
          this.recordScrollTop();
          //
          this.swapList(newList, index-1, down_index-1);
        });
      },
      handInsert(index) {
        // 替换顺序
        swal({
          title: `将No.${index} 移动到No.`,
          type: 'input',
          inputClass: 'spec-input',
          confirmButtonText: '确定',
          showCancelButton:true,
          closeOnConfirm: false,
          cancelButtonText: '取消',
        },()=>{
          // 当前input dom
          let input = document.querySelector('.show-input').querySelector('input');
          let value = trimStr(input.value);
          // 是否是有效值
          if(value <= 0 || value > this.prepareList.length){
            return swal({
              title: '错误提醒',
              text: `有效值范围在1~${this.prepareList.length}之间`,
              confirmButtonText: "知道了"
            });
          }
          // 是否有值
          if(!value){
            return swal({
              title: '错误提醒',
              text: '输入框不为空',
              confirmButtonText: "知道了"
            });
          }
          // 是否是数字
          if(!/^\d+$/.test(value)){
            return swal({
              title: '错误提醒',
              text: '请输入数值',
              confirmButtonText: "知道了"
            });
          }
          // 进行交换
          this.handJump(index, value, (data)=>{
            let newList = [...this.prepareList];
            //
            this.jumpList(newList, index-1, value-1, data);
            // 关闭弹窗
            swal.close();
          });
        });
      },
      swapList(arr, index1, index2) {
        let seqno1 = arr[index1].seqno;
        let seqno2 = arr[index2].seqno;
        //
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        this.$store.commit('UPDATE_PREPARE_LIST', []);
        // 替换seqno
        arr[index1].seqno = seqno1;
        arr[index2].seqno = seqno2;
        // 开始
        setTimeout(()=>{
          this.$store.commit('UPDATE_PREPARE_LIST', arr);
          // 调到原先指定的位置
          this.goToScroll(scrollTop);
        }, 100);
      },
      jumpList(arr, index1, index2, seqno) {
        arr.splice(index2, 0, arr.splice(index1, 1)[0]);
        //
        this.$store.commit('UPDATE_PREPARE_LIST', []);
        // 替换seqno
        arr[index2].seqno = seqno;
        //
        setTimeout(()=>{
          this.$store.commit('UPDATE_PREPARE_LIST', arr);
          // 调到指定的位置
          this.jumpScrollTop(index2);
        }, 100);
      },
      handDelete(index) {
        // 删除记录
        swal({
          title: '',
          text: `确定要删除 No.${index} 吗？`,
          confirmButtonText: '确定',
          showCancelButton:true,
          closeOnConfirm: false,
          cancelButtonText: '取消',
        },()=>{
          let sign = index-1;
          let cursor = this.prepareList[sign].seqno;
          // 开始删除记录
          this.$store.dispatch('fetchPrepareDelete',{lesson_sn:this.lesson_sn, cursor:cursor}).then((data) => {
            // 删除成功
            let newList = [...this.prepareList];
            newList.splice(sign, 1);
            // 关闭弹窗
            swal.close();
            // 开始
            setTimeout(()=>{
              this.$store.commit('UPDATE_PREPARE_LIST', newList);
            }, 100);
          }, (err) => {
            swal({
              title: '错误提醒',
              text: err.message,
              confirmButtonText: "知道了"
            });
          });
        });
      },
      goToScroll(scrollHeight) {
        // 是否有
        if(!prepareScroll){
          prepareScroll = document.getElementById('prepare-body');
        }
        //
        setTimeout(()=>{
          prepareScroll.scrollTop = scrollHeight;
        }, 100);
      },
      recordScrollTop() {
        // 是否有
        if(!prepareScroll){
          prepareScroll = document.getElementById('prepare-body');
        }
        scrollTop = prepareScroll.scrollTop;
      },
      jumpScrollTop(index) {
        // 是否有
        if(!prepareScroll){
          prepareScroll = document.getElementById('prepare-body');
        }
        // 找到指定的children
        setTimeout(()=>{
          prepareScroll.scrollTop = prepareScroll.querySelector('ul').children[index].offsetTop - 150;
        }, 100);
      },
      textFormat(value){
        return value.replace(/\n/g, '<br>');
      },
      showNote(value){
        swal({
          title: '备注内容',
          text: value,
          confirmButtonText: "知道了"
        });
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
