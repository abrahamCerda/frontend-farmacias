<template>
  <div id="app">
    <img alt="Consorcio logo" src="./assets/logo.png" style="width: 100%; height: 300px;">
    <Pharmacies/>
  </div>
</template>

<script>
import Pharmacies from './components/Pharmacies.vue'

export default {
  name: 'App',
  components: {
    Pharmacies,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
