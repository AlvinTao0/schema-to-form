<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="container">
    <nav>
      <router-link class="menu-item" to="/service">Services</router-link>
      <router-link class="menu-item" to="/route">Routes</router-link>
      <router-link class="menu-item" to="/plugin">Plugins</router-link>
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.container {

}
.menu-item {
  line-height: 36px;
  color: rgba(0, 0, 0, .7);
}
.menu-item.router-link-active {
  color: #003694;
}
nav {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 240px;
  height: auto;
  min-height: 100%;
  border-right: 1px solid #e6e7e8;
  background: #f8f8fa;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
}
main {
  margin-left: 240px;
  padding: 20px;

}
</style>
