<template>
  <div class="musicList">
    <div class="musicListTop">
      <div class="title">推荐歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="mlist">
      <div class=" mySwiper">
        <swiper :slidesPerView="swiper_options.slidesPerView" :loopedSlides="swiper_options.loopedSlides" :spaceBetween="swiper_options.spaceBetween">
          <swiper-slide v-for="(item, i) in muList.result" :key="i">
            <router-link :to="{path:'/listview',query:{id:item.id}}" >
              <img :src="item.picUrl" :alt="item.name" />
              <div class="name">{{ item.name }}</div>
              <div class="count">
                <img src="../assets/icon/bf.png" />
                <span>
                  {{ item.playCount >= 100000000 ? (item.playCount / 100000000).toFixed(2) + '亿' : (item.playCount / 10000).toFixed(2) + '万' }}
                </span>
              </div>
            </router-link>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted,ref } from 'vue'
//引入swiper
import SwiperCore, { Autoplay, Pagination, EffectCoverflow, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.less'
import 'swiper/components/navigation/navigation.less'
import { getMusicList } from '@/api/index'
//设置swiper
SwiperCore.use([Autoplay, Pagination, EffectCoverflow, Navigation])
export default {
  name: 'musicList',
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    //轮播图
    let swiper_options = reactive({
      slidesPerView: 3,
      loopedSlides: 3,
      spaceBetween: 30
    })
    //获取的歌单数
    var num = ref(10)
    //获取推荐歌单
    var muList = reactive({
      result: [
        {
          picUrl: '',
          name: '',
          playCount: 0
        }
      ]
    })
    onMounted(async () => {
      let { data: res } = await getMusicList(num.value)
       muList.result = res.result
    })

    return { swiper_options, muList, onMounted }
  }
}
</script>
<style lang="less" scoped>
.musicList {
  width: 7.5rem;
  padding: 0 0.4rem;
  .musicListTop {
    display: flex;
    justify-content: space-between;
    height: 1rem;
    align-items: center;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      padding: 0.08rem;
      border-radius: 0.2rem;
      font-size: 0.26rem;
      width: 1.4rem;
      text-align: center;
      line-height: 0.4rem;
    }
  }
  .mlist {
    
    .mySwiper {
      position: relative;
      width: 100%;
      height: 4rem;

      .swiper-slide {
        display: flex;
        flex-direction: column;
        position: relative;
        img {
          width: 100%;
          height: auto;
          border-radius: 0.1rem;
        }
        .name {
          line-height: 0.4rem;
          font-size: 0.25rem;
          width: 100%;
        }
        .count {
          position: absolute;
          line-height: 0.5rem;
          right: 0.1rem;
          top: 0rem;
          color: #ccc;
          font-size: 0.25rem;
          display: flex;
          align-items: center;
          img {
            width: 0.25rem;
            height: 0.25rem;
          }
        }
      }
    }
  }
  .swiper-container{
    z-index: 0;
  }
}
</style>
