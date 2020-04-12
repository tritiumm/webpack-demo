<template>
  <div id="cotainer">{{ initData }}</div>
</template>
<script>
  export default {
    data(){
      return {
        initData: 'hello word'
      }
    }
  }
</script>
<style scoped>
  #container {
    color: red;
  }
</style>
