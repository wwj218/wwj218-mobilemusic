<template>
  <div class="playcontrol">
    <div class="left" @click="show = !show">
      <img  :src="playlist[playCurrentIndex].al.picUrl" alt="" />
      <div class="content">
        <div class="title">{{ playlist[playCurrentIndex].al.name }}</div>
        <div class="tips">横滑可以切换上下首哦</div>
      </div>
    </div>
    <div class="right">
      <img v-if="paused" src="@/assets/icon/zt2.png" class="pause" @click="play" />
      <img v-else src="@/assets/icon/ks.png" class="pause" @click="play" />
      <img src="@/assets/icon/pl.png" class="menu" />
    </div>

    <playmusic :play="play" :paused="paused" @back="show = !show" v-show="show" :playDetail="playlist[playCurrentIndex]"></playmusic>

    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3 `"></audio>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { reactive, ref, onMounted, onUpdated} from 'vue'
import playmusic from './playMusic.vue'
import store from '@/store/index'
export default {
  components: { playmusic },
  computed: {
    ...mapState(['playlist', 'playCurrentIndex'])
  },
  mounted() {
    this.$store.dispatch('reqLyric', { id: this.playlist[this.playCurrentIndex].id })
  },
  updated(){
    this.$store.dispatch('reqLyric', { id: this.playlist[this.playCurrentIndex].id })
  },
  setup() {
    //控制播放器是否播放
    let paused = ref(true)
    let show = ref(false)
    let audio = ref(null)
    const play = () => {
      if (audio.value.paused) {
        audio.value.play()
        paused.value = false
        UpdateTime()
      } else {
        audio.value.pause()
        paused.value = true
        clearInterval(store.state.id)
      }
    }
    const UpdateTime = () => {
      store.state.id = setInterval(() => {
        store.commit('setCurrentTime',audio.value.currentTime)
      }, 1000)
    }
    onMounted(() => {
      
    })
    onUpdated(() => {
     
    })
    return { audio, play, paused, show,UpdateTime }
  }
}
</script>

<style lang="less" scoped>
.playcontrol {
  background-color: #fff;
  width: 7.5rem;
  height: 1.2rem;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
  .left {
    display: flex;
    padding: 0 0.2rem;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.4rem;
    }
    .content {
      padding: 0 0.2rem;
      font-size: 0.2rem;
      .tips {
        font-size: 0.2rem;
        color: #999;
      }
    }
  }
  .right {
    position: relative;
    img {
      margin: 0 0.2rem;
      width: 0.6rem;
      height: 0.6rem;
    }
    .menu {
      position: absolute;
      right: 0;
      bottom: -0.25rem;
    }
    .pause {
      position: absolute;
      right: 0.85rem;
      bottom: -0.25rem;
    }
  }
}
</style>
