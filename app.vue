<template>
  <div class="wrap">
    <div class="container">
      <MainVue/>
      <SubView/>
    </div>
  </div>
</template>

<script>
// import MainVue from "~/components/MainVue.vue";
// import SubView from "~/components/SubView.vue";

export default {
  name: 'IndexPage',
  components:{
    // MainVue,
    // SubView
  },
  mounted(){
  }
}

</script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
.wrap {
    @include center;
    width: 100%;
    height: 100vh;
    font-size: 16px;

    .container {
        @include center-sb;
        width: 55%;
        height: 90%;
        max-width: 1920px;
        max-height: 1354px;
    }
}
</style>