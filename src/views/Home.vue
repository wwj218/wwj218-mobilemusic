<template>
  <Navbar></Navbar>
  <Swipe></Swipe>
  <IconList></IconList>
  <musicList></musicList>
  <MVList></MVList>
  <playController></playController>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Swipe from '@/components/Swipe.vue'
import IconList from '@/components/IconList.vue'
import musicList from '@/components/musicList.vue'
import MVList from '@/components/MVList'
import playController from '@/components/playContol.vue'
export default {
  name: 'Home',
  components: {
    Navbar,
    Swipe,
    IconList,
    musicList,
    MVList,
    playController
  }
}
</script>
<style lang="less" scope>

</style>
