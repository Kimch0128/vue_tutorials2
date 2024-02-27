<template>
  <Tutorial/>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted(){
    //env 사용법
    console.log(process.env.TEST)
  }
}
</script>
