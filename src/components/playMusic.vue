<template>
  <div class="playMusic">
    <div class="bg" :style="{ backgroundImage: `url(${playDetail.al.picUrl})` }"></div>
    <div class="playTop">
      <div class="back" @click="$emit('back')">
        <img src="@/assets/icon/zjt.png" />
      </div>
      <div class="center">
        <div class="title">
          <!-- 走马灯 -->
          <marquee behavior="scroll" direction="left">
            {{ playDetail.al.name }}
          </marquee>
        </div>
      </div>
      <div class="share">
        <img src="@/assets/icon/fxf.png" />
      </div>
    </div>
    <div class="playContent" v-show="!islyric"  @click="islyric = !islyric">
      <img class="needle" :class="{active:!paused}" src="@/assets/needle.png" alt="">
      <img class="plus" src="@/assets/plus.png" alt="">
      <img :src="playDetail.al.picUrl" class="playImg" :class="run==true?'run':''" alt="">
    </div>
    <div class="playLyric" v-show="islyric" @click="islyric = !islyric" ref="playLyric">
      <p :class="{activee:(currentTime*1000 >item.pre&&currentTime*1000 < item.time)}" v-for="(item,i) in $store.getters.lyricList" :key="i">{{item.lyric}}</p>
    </div>
    <div class="progress"></div>
    <div class="playFooter">
      <img  src="@/assets/icon/xh.png" alt="">
      <img  src="@/assets/icon/s.png" alt="" @click="goPlay(-1)">
      <img v-if="paused" class="play" src="@/assets/icon/bf2.png" @click="play">
      <img v-else src="@/assets/icon/ks2.png" class="play" @click="play" />
      <img  src="@/assets/icon/next.png" alt=""  @click="goPlay(1)">
      <img  src="@/assets//icon/pl2.png" alt="">
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { reactive, ref, onMounted ,watch} from 'vue'
import store from '@/store/index'
export default {
  props: ['playDetail','paused','play'],
  data(){
    return{
      run:false
    }
  },
  computed: {
    ...mapState(['lyric','currentTime','playlist','playCurrentIndex']),
  },
  watch:{
    currentTime:function(newValue){
      let p = document.querySelector('p.activee')       
      if(p !== null){
        if(p.outerText !== p.innerText){
          this.$refs.playLyric.scrollTop= this.$refs.playLyric.scrollTop+150
        }else{
          this.$refs.playLyric.scrollTop = this.$refs.playLyric.scrollTop
        }
    }   
    }
  },
  methods:{
     goPlay (num){
       this.run = !this.run
      let index = this.playCurrentIndex+num
      if(index < 0){
        index = this.playlist.length-1
      }else if(index == this.playlist.length){
        index = 0
      }
      this.$store.commit('setPlayIndex',index)
    }
  },
  setup(){
    //歌词的显示
    let islyric = ref(false)
    return{ islyric } 
  }
}
</script>

<style lang="less" scoped>
.playMusic {

  position: fixed;
  left: 0;
  top: 0;
  // 占满全屏
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    // 占满全屏
    width: 100vw;
    height: 100vh;
    background-size: auto 100%;
    background-position: center;
    filter: blur(60px);
  }
  .playTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 7.5rem;
    height: 1.2rem;
    position: absolute;
    left: 0;
    top: 0;
    color: #fff;
    padding: 0 0.4rem;
    .center{
      .title{
        marquee{
          width: 5rem;
          flex: 1;
        }
      }
    }
    .back {
      img {
        width: 0.6rem;
        height: 0.6rem;
      }
    }
    .share {
      img {
        width: 0.6rem;
        height: 0.6rem;
       color: #fff;
      }
    } 
  }
    .playContent{
      position: absolute;
      width: 7.5rem;
      height: 7.5rem;
      left: 0;
      top: 1.5rem;
       .needle{
        width: 2.5rem;
        height: auto;
        position: absolute;
        left: 3.5rem;
        transform-origin: 0.3rem 0;
        transform: rotate(-10deg);
        transition: all 1s;
        z-index: 10;
      }
      .needle.active{
        
        transform: rotate(10deg);
        transition: all 1s;
        z-index: 10;
      }
      .plus{
        width: 5.5rem;
        height: auto;
        position: absolute;
        left: calc(50% - 2.75rem) ;
        top: 3rem;
        
      }
      .playImg{
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 1.7rem;
        position: absolute;
        left: calc(50% - 1.77rem) ;
        top: 4rem;
        
      }
      .playImg.run{
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 1.7rem;
        position: absolute;
        left: calc(50% - 1.77rem) ;
        top: 4rem;
        animation: rotate 6s linear infinite;
      }
    }
    .playFooter{
      width: 7.5rem;
      height: 1.5rem;
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.4rem;
      img{
        width: 0.6rem;
        height: 0.6rem;
      }
      img.play{
        width: 1rem;
        height: 1rem;
      }
    }
    .playLyric{
       position: absolute;
      width: 7.5rem;
      height: 8rem;
      left: 0;
      top: calc(50% - 4rem);
      overflow: scroll;
      text-align: center;
      color: rgb(163, 158, 158);
      padding: 0.2rem 0;
      font-size: 0.4rem;
      line-height: 1.1rem;
      .activee{
        color: #fff;
      }
    }
}
@keyframes rotate{
  0%{
    transform: rotateZ(0deg);
  }
  100%{
    transform: rotateZ(360deg);
  }
}
</style>
