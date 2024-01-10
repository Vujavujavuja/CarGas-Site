<template>
  <header class="header">
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: 'CarGasHeader',
  props: {
    title: String
  }
}
</script>

<style scoped>
.header {
  background-color: #3eaf7c;
  color: white;
  padding: 10px;
  font-family: 'Gloock', cursive;
  font-size: 2em;
  text-align: center;
}
</style>
