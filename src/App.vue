<template>
  <div id="app">
  <router-view class="router" style="padding-bottom: 1rem;" />
    
  </div>
</template>

<script>

export default {
    name: 'App',
    components: {
    }
}
</script>

<style>

html, body {
    height: 100%;
    background-image: url('~@/assets/background.png') ;
    background-repeat: no-repeat;
    background-size: 100% 60%;
    background-color: #f1f1f1 !important;
}


#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    
}
</style>
