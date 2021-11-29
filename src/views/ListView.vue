<template>
  <div class="listview">
    <listviewTop :playlist="state.playlist"></listviewTop>
    <playList :playlist="state.playlist"></playList>
  </div>
  <playController></playController>
</template>

<script>
import {getPlaylistDetail} from '../api/index'
import { reactive, onMounted } from 'vue'
import store from '@/store/index'
import playController from '@/components/playContol.vue'
//获取传过来的id
import {useRoute} from 'vue-router'
import listviewTop from '@/components/listviewTop.vue'
import playList from '@/components/playList.vue'
export default {
  name:'listView',
  components:{
    listviewTop,
    playList,
    playController
  },
  setup() {
    const route = useRoute()
    let state = reactive({
      list:[],
      playlist:{
        creator:{},
        tracks:[]
      }
    })
    onMounted(async () => {
      let id = route.query.id
      const {data:res} = await getPlaylistDetail(id)
      state.playlist = res.playlist
      store.commit('setPlaylist',state.playlist.tracks)
      console.log(state.playlist)
    })

    return {  state, onMounted}
  }
}
</script>

<style>

</style>