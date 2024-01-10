<template>
  <div id="app">
    <Header title="Welcome to Our Gas Station"/>
    <nav>
      <router-link to="/fuel-prices">Fuel Prices</router-link>
      <router-link to="/services">Services</router-link>
      <router-link to="/contact">Contact Us</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
/* Add your global styles here */
</style>
