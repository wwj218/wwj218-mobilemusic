<template>
  <div class="listTop">
    <img :src="playlist.coverImgUrl" class="listTopBg" />
    <div class="listViewTopNav">
      <div class="back">
        <img src="@/assets/icon/zjt.png" @click="$router.go(-1)"/>
        <div class="title">歌单</div>
      </div>
      <div class="search">
        <img src="@/assets/icon/search.png" />
      </div>
      <div class="more">
        <img src="@/assets/icon/more.png" />
      </div>
    </div>
    <div class="content">
      <div class="contentLeft">
        <img :src="playlist.coverImgUrl" class="bgimg" />
        <img src="@/assets/icon/bf.png" class="bfIcon" />
        <span>
          {{ playlist.playCount >= 100000000 ? (playlist.playCount / 100000000).toFixed(2) + '亿' : (playlist.playCount / 10000).toFixed(2) + '万' }}
        </span>
      </div>
      <div class="contentRight">
        <h3>{{ playlist.name }}</h3>
        <div class="author">
          <img :src="playlist.creator.avatarUrl" class="header" />
          <span>{{ playlist.creator.nickname }}</span>
        </div>
        <div class="description">
          {{ playlist.description }}
        </div>
      </div>
    </div>
    <div class="iconList">
      <div class="iconItem">
        <img src="@/assets/icon/chat.png" />
        <span>{{ playlist.commentCount }}</span>
      </div>
      <div class="iconItem">
        <img src="@/assets/icon/share.png" />
        <span>{{ playlist.shareCount }}</span>
      </div>
      <div class="iconItem">
        <img src="@/assets/icon/down.png" id="down" />
        <span>下载</span>
      </div>
      <div class="iconItem">
        <img src="@/assets/icon/choice.png" />
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['playlist'],
  mounted() {
    console.log(this.props)
  },
  setup() {}
}
</script>

<style lang="less" scoped>
.listTop {
  width: 7.5rem;
  padding: 0 0.4rem;
  position: relative;
  .listTopBg {
    position: fixed;
    left: 0;
    top: 0;
    width: 7.5rem;
    height: auto;
    z-index: -1;
    filter: blur(30px);
  }
  .listViewTopNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.2rem;
    font-size: 0.4rem;
    img {
      width: 0.6rem;
      height: 0.6rem;
    }
    .title {
      margin-left: 0.4rem;
    }
    .search {
      margin-left: 3rem;
    }
    .more {
      margin-top: 0.1rem;
    }
  }
  .back,
  .search {
    display: flex;
    color: #fff;
  }
  .content {
    display: flex;
    justify-content: space-between;
    padding: 0.6rem 0;
    .contentLeft {
      position: relative;
      .bgimg {
        width: 2.8rem;
        height: 2.8rem;
        border-radius: 0.1rem;
      }
      .bfIcon {
        position: absolute;
        width: 0.3rem;
        height: 0.3rem;
        right: 1.2rem;
        top: 0.15rem;
      }
      span {
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        color: #ccc;
        font-weight: 900;
      }
    }
    .contentRight {
      width: 3.5rem;
      h3 {
        color: #ccc;
      }
      .author {
        display: flex;
        align-items: center;
        margin: 0.2rem 0;
        span {
          color: #ccc;
          font-size: 0.28rem;
        }
        img.header {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 0.3rem;
          margin-right: 0.2rem;
        }
      }
      .description {
        font-size: 0.24rem;
        color: #aaa;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  .iconList {
    width: 7.5rem;
    display: flex;
    justify-content: space-between;
    padding-right: 1.15rem; 
    padding-left: 0.3rem;
   
    .iconItem {
      display: flex;
      flex-direction: column;
      align-items: center;
     
      img{
        width: 0.6rem;
        height: 0.6rem;
      }
      #down{
        width: 0.65rem;
        height: 0.65rem;
      }
      span{
        font-size: 0.28rem;
        padding-top: 0.3rem;
        color: #fff;
      }
    }
  }
}
</style>
