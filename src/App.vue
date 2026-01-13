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
  transition:
    filter 1.2s ease-in-out,
    opacity 1.2s ease-in-out,
    transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: filter, opacity, transform;
}

.menu-open #main-content {
  filter: blur(20px); /* Daha performanslı ve yumuşak bir geçiş için düşürüldü */
  opacity: 0.2;
  transform: scale(0.95);
  pointer-events: none;
}
</style>
