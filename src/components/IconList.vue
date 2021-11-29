<template>
  <div class="iconList">
    <div class="iconItem">
      <img src="@/assets/icon/sc.png" alt="" />
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <img src="@/assets/icon/FM.png" alt="" />
      <span>私人FM</span>
    </div>
    <div class="iconItem">
      <img src="@/assets/icon/gd.png" alt="" />
      <span>歌单</span>
    </div>
    <div class="iconItem" id="last">
      <img src="@/assets/icon/phb.png" alt="" />
      <span>排行榜</span>
    </div>
  </div>

</template>

<script>
export default {
  components: {
  },
}
</script>

<style lang="less" scope>
.iconList {
  width: 7.5rem;
  display: flex;
  justify-content: space-between;
  padding: 0.4rem;
  .iconItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 1.2rem;
      height: 1.2rem;
    }
    span{
      font-size: 0.2rem;
    }
  }
}
</style>
