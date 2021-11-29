<template>
  <div>
  <router-view></router-view>
  </div>
</template>
<script>
import {onMounted} from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'App', 
  component: {
  },
  setup() {
    // 将登录后的信息保存到本地，刷新不会跳回登录页
      const store = useStore()
      onMounted(() => {
        if(localStorage.userData){
          let userData = JSON.parse(localStorage.userData)
          store.commit('setUser', userData)
        }
        
        
      })
      return{ onMounted}
    }

}
</script>
<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family:'微软雅黑';
}
a{
  color: #333;
  text-decoration: none;
}
</style>
