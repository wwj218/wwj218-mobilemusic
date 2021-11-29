<template>
  <div class="searchTop">
    <div class="searchTopNav">
      <div class="back" @click="$router.go(-1)">
        <img src="@/assets/icon/zjt.png" />
      </div>
      <div class="title">
        <input ref="input" v-model="placeholder.searchKeyword" type="text" :placeholder="placeholder.name" @keydown.enter="saveKeyword" />
      </div>
    </div>
    <div class="history" v-show="placeholder.searchSongs.length == 0">
      <div class="historyLeft">
        历史
      </div>
      <div class="historyCenter">
        <div @click="historySearch(item)" class="keywordItem" v-for="(item, i) in placeholder.keywordList" :key="i">
          {{ item }}
        </div>
      </div>
      <div class="delete" @click="clearKeywordList">
        <img src="@/assets/icon/delete.png" />
      </div>
    </div>
    <!-- 搜索出来的歌单 -->
    <div class="searchSongs" v-show="placeholder.searchSongs.length !== 0">
      <div class="searchSongsTop">
        <div class="left">
          <img src="@/assets/icon/zt.png" />
          <div class="text">
            <div class="title">播放全部</div>
            <div class="num">( 共{{ placeholder.searchSongs.length }}首 )</div>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="playitem" v-for="(item, i) in placeholder.searchSongs" :key="i">
          <div class="left">
            <div class="index">{{ i + 1 }}</div>
            <div class="content">
              <div class="title">{{ item.name }}</div>
              <div class="anthor">
                <span>{{ item.album.name }}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <img src="@/assets/icon/bf2.png" class="stop" @click="setPlay(item,i)" />
            <img src="@/assets/icon/more.png" class="more" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onBeforeMount, ref } from 'vue'
import { searchMusic } from '@/api/index'
import { useStore } from 'vuex'
import { Dialog } from 'vant'
export default {
  components: {},
  setup() {
    const placeholder = reactive({
      name: '陈奕迅',
      keywordList: [],
      searchKeyword: '',
      searchSongs: []
    })
   const store = useStore()

    onBeforeMount(() => {
      placeholder.keywordList = localStorage.keywordList ? JSON.parse(localStorage.keywordList) : []
    })
    const saveKeyword = async () => {
      placeholder.keywordList.push(placeholder.searchKeyword)
      placeholder.keywordList = Array.from(new Set(placeholder.keywordList)) 
      if(placeholder.keywordList > 10){
       placeholder.keywordList = placeholder.keywordList.slice(placeholder.keywordList -10,placeholder.keywordList.length)
      }
      localStorage.keywordList = JSON.stringify(placeholder.keywordList)
      //搜索歌曲
      let { data: res } = await searchMusic(placeholder.searchKeyword)
      console.log(res.result.songs)
      placeholder.searchSongs = res.result.songs
      //重置搜索框
      placeholder.searchKeyword = placeholder.searchKeyword
      placeholder.name = ''
    }
    //点击搜索历史实现搜索
    const historySearch = async (keyword) => {
     placeholder.searchKeyword = keyword
     saveKeyword()
    }
    //点击搜索内容播放
    const setPlay = (item,i) => {
      item.al = item.album
      item.al.picUrl = item.album.artist.img1v1Url
      store.commit('pushPlaylist', item)
      store.commit('setPlayIndex', store.state.playlist.length-1)

    }

    const clearKeywordList = () => {
      Dialog.confirm({
        message: '确定清空全部历史记录？'
      })
        .then(() => {
          // on confirm

          localStorage.clear()
          placeholder.keywordList = []
          placeholder.searchSongs = []
          placeholder.name = '陈奕迅'
        })
        .catch(() => {
          // on cancel
        })
    }

    return { placeholder, saveKeyword, clearKeywordList,historySearch,setPlay}
  }
}
</script>

<style lang="less" scoped>
.searchTop {
  width: 7.5rem;
  height:calc(100vh - 1.2rem);
  padding:0 0.4rem;
  margin-left: -0.35rem;
  .searchTopNav {
    display: flex;
    width: 100%;
    height: 1.2rem;
    padding:0 0.4rem;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    .back {
      flex: 1;
      img {
        width: 0.6rem;
        height: 0.6rem;
      }
    }
    .title {
      flex: 9;
      padding: 0 0.4rem;
      input {
        border: none;
        outline: none;
        border-bottom: 1px solid #666;
        width: 100%;
        height: 0.5rem;
      }
    }
  }
  .history {
    display: flex;
    margin-top: 1.2rem;
    .historyLeft {
      width: 1.2rem;
      height: 0.6rem;
      font-weight: 900;
      margin: 0.2rem 0rem;
      line-height: 0.6rem;
    }
    .historyCenter {
      color: #666;
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      .keywordItem {
        background-color: #eee;
        height: 0.6rem;
        padding: 0 0.2rem;
        border-radius: 0.4rem;
        line-height: 0.6rem;
        margin: 0.2rem 0.1rem;
      }
    }
    .delete {
      height: 0.6rem;
      margin: 0.2rem 0.2rem;
      line-height: 0.6rem;
      img {
        width: 0.6rem;
        height: 0.6rem;
      }
    }
  }

  .searchSongs {
    width: 7.5rem;
    padding: 0 0.4rem;
    background-color: #fff;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    position: fixed;
    top: 1.2rem;
    bottom: 1.2rem;
    overflow: scroll;
    .searchSongsTop {
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
        .num {
          font-size: 0.28rem;
          color: #666;
        }
        img {
          width: 0.5rem;
          height: 0.5rem;
        }
        .text {
          display: flex;
          align-items: center;
          margin-left: 0.2rem;
        }
      }
      .collect {
        font-size: 0.24rem;
        color: #fff;
        background-color: red;
        line-height: 0.6rem;
        padding: 0.1rem;
        border-radius: 0.4rem;
      }
    }
    .list {
      .playitem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
        .left {
          display: flex;
          align-items: center;
          color: #666;
          .index {
            width: 0.4rem;
            font-size: 0.4rem;
            color: #ccc;
          }
          .content {
            margin-left: 0.4rem;
            width: 4.8rem;
          }
          .title {
            font-size: 0.2rem;
            font-weight: 900;
            color: #000;
            margin-bottom: 0.1rem;
          }
          .tag {
            font-size: 0.1rem;
            color: orangered;
            border: 1px solid orangered;
            border-radius: 0.1rem;
          }
          .anthor {
            font-size: 0.1rem;
            color: #666;
            .tag {
              margin-right: 0.1rem;
            }
          }
        }
        .right {
          position: relative;
          img {
            width: 0.5rem;
            height: 0.5rem;
          }
          .stop {
            position: absolute;
            right: 0.55rem;
          }
          .more {
            position: absolute;
            right: -0.05rem;
          }
        }
      }
    }
  }
}
</style>
