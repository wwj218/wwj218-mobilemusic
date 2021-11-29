<template>
  <div class="narbar">
    <van-icon name="wap-nav" size="30" id="Navlicon" @click="$router.push('/personal')"/>
    <van-search v-model="value" placeholder="请输入搜索关键词" class="search" @click="$router.push('/searchview')"/>
    <van-icon name="music" size="30" id="Navricon"/>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  components: {}
}
</script>

<style lang="less" scope>
.narbar{
  width: 7.5rem;
  height: 0.8rem;
  display: flex;
  justify-content: space-between;
  margin-top: 0.1rem;
  margin-bottom: 0.2rem;

}
.narbar #Navlicon{
  padding-top: 10px;
  margin-left: 0.1rem;

}
.narbar #Navricon{
  padding-top: 10px;
  margin-right: 0.1rem;

}
</style>
