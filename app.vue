<template>
  <div class="wrap">
    <div class="container">
      <MainVue/>
      <SubView/>
    </div>
  </div>
</template>

<script>
import MainVue from "~/components/MainVue.vue";
import SubView from "~/components/SubView.vue";

export default {
  name: 'IndexPage',
  components:{
    MainVue,
    SubView
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

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
</style>