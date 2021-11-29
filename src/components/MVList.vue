<template>
  <div class="MvList">
    <div class="MvListTop">
      <div class="title">排行榜</div>
      <div class="more">更多</div>
    </div>
    <div class="mlist">
      <table class="mytable">
        <tr v-for="(item, i) in mvList.result" :key="i">
          <th class="myth">
            <img :src="item.cover" :alt="item.artistName" />
            <div class="name">
              <span class="mynum">{{i+1}}</span>
              <span>{{item.artistName}} -</span>
              <span>{{item.mv.title}}</span>
            </div>
          </th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from 'vue'

import { getMvList } from '@/api/index'
export default {
  name: 'MvList',
  setup() {
    //获取精选视频页数
    var num = ref(3)
    //获取精选视频
    var mvList = reactive({
      result: [
        {
          cover: '',
          artistName: '',
          mv: {}
        }
      ]
    })
    onMounted(async () => {
      let { data: res } = await getMvList(num.value)
      mvList.result = res.data
    })

    return { mvList, onMounted }
  }
}
</script>
<style lang="less" scoped>
.MvList {
  width: 7.5rem;
  margin-top: -0.4rem;
  padding: 0 0.4rem;
  .MvListTop {
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
    .mytable {
      .myth {
        width: 6.6rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        img {
          border-radius: 0.1rem;
          width: 0.8rem;
          height: 0.8rem;
          margin-bottom: 0.1rem;
          margin-top: 0.1rem;
        }
        .name{
          margin-left: 0.5rem;
          .mynum{
            margin-right: 0.2rem;
          }
        }
      }
    }
  }
}
</style>
