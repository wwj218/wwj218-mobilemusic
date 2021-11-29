<template>
  <div class="mswipevant">
    <van-swipe :autoplay="4000" lazy-render class="myswipe">
      <van-swipe-item v-for="(item, i) in images.img" :key="i">
        <img :src="item.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { getSwiper } from '@/api/index'
export default {
  name: 'Swipe',
  setup() {
    //轮播图
    // type: 资源类型, 对应以下类型, 默认为 0 即PC
    // 0: pc
    // 1: android
    // 2: iphone
    // 3: ipad
    var type = ref(2)
    var images = reactive({
      img: []
    })
    onMounted(async () => {
      let { data: res } = await getSwiper(type.value)
      images.img = res.banners
    })
    return {
      images,
      onMounted
    }
  }
}
</script>

<style lang="less" scoped>
.mswipevant {
  width: 7.5rem;
  height: 3rem;
}
.mswipevant img {
  display: inline-block;
  width: 100%;
  height: 3rem;
  border-radius: 0.1rem;
}
.my-swipe .van-swipe-item {
  width: 100%;
  height: 100px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
