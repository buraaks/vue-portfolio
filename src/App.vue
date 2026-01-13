<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import AuroraBg from './components/layout/AuroraBg.vue'
import MainNavbar from './components/layout/MainNavbar.vue'
import OverlayMenu from './components/navigation/OverlayMenu.vue'

const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : 'auto'
}

const closeMenu = () => {
  menuOpen.value = false
  document.body.style.overflow = 'auto'
}
</script>

<template>
  <div :class="{ 'menu-open': menuOpen }">
    <AuroraBg :menuOpen="menuOpen" />
    <MainNavbar :menuOpen="menuOpen" @toggle-menu="toggleMenu" />

    <div id="main-content">
      <RouterView />
    </div>

    <OverlayMenu :active="menuOpen" @close="closeMenu" />
  </div>
</template>

<style>
#main-content {
  transition: all 0.8s var(--transition);
}

.menu-open #main-content {
  filter: blur(50px);
  opacity: 0.2;
  transform: scale(0.95);
  pointer-events: none;
}
</style>
