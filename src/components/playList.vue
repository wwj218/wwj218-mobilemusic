<template>
  <div class="playList">
    <div class="playTop">
      <div class="left">
        <img src="@/assets/icon/zt.png" />
        <div class="text">
          <div class="title">播放全部 </div>
          <div class="num">( 共{{ playlist.tracks.length }}首 )</div>
        </div>
      </div>
      <div class="collect">+ 收藏 ({{ playlist.subscribedCount >= 100000000 ? (playlist.subscribedCount / 10000).toFixed(2) + '万' : playlist.subscribedCount}})</div>
    </div>
    <div class="list">
      <div class="playitem" v-for="(item,i) in playlist.tracks" :key="i">
        <div class="left">
          <div class="index">{{i+1}}</div>
          <div class="content">
            <div class="title">{{item.name}}</div>
            <div class="anthor">
              <span class="tag" v-for="(tag,index) in playlist.tags" :key="index">{{tag}}</span>
              <span>{{item.al.name}}</span>
              
            </div>
          </div>
        </div>
        <div class="right">    
            <img src="@/assets/icon/bf2.png"  class="stop" @click="setPlayIndex(i)">
            <img src="@/assets/icon/more.png"  class="more">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations} from 'vuex'
export default {
  props: ['playlist'],
  methods:{
    ...mapMutations(['setPlayIndex'])
  }
}
</script>

<style lang="less" scoped>
.playList {
  width: 7.5rem;
  padding: 0 0.4rem;
  background-color: #fff;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  margin-top: 0.4rem;
  .playTop {
    display: flex;
    justify-content: space-between;
    height: 1rem;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .title {
        font-size: 0.35rem;
        font-weight: 900;
      }
      .num{
        font-size: 0.28rem;
        color: #666;
      }
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
      .text{
        display: flex;
        align-items: center;
        margin-left: 0.2rem;
      }
    }
    .collect{
      font-size: 0.24rem;
      color: #fff;
      background-color: red;
      line-height: 0.6rem;
      padding: 0.1rem;
      border-radius: 0.4rem;
    }
  }
  .list{
    .playitem{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1rem;
      .left{
        display: flex;
        align-items: center;
        color:  #666;
        .index{
          width: 0.4rem;
          font-size: 0.4rem;
          color: #ccc;
        }
        .content{
          margin-left: 0.4rem;
          width: 4.8rem;
        }
        .title{
          font-size: 0.2rem;
          font-weight: 900;
          color: #000;
          margin-bottom: 0.1rem;
        }
        .tag{
          font-size: 0.1rem;
          color: orangered;
          border: 1px solid orangered;
          border-radius: 0.1rem;
        }
        .anthor{

          font-size: 0.1rem;
          color: #666;
          .tag{
            margin-right: 0.1rem;
          }
        }
      }
      .right{
        position: relative;
        img{
           width: 0.5rem;
           height: 0.5rem;
        }
        .stop{
          position: absolute;
          right: 0.55rem;
        }
        .more{
          position: absolute;
          right: -0.05rem;
        }
      }
    }
  }
}
</style>
