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
    background-color: #f1f1f1 !important;
    width: 100%
}


#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%
}
.router {
    width: 100%
}
</style>
