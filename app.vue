<script setup>
import { ref, onMounted } from 'vue'

const menuOpen = ref(false)

// Rastgele renk aralıkları (Şık duran tonlar)
const colorSchemes = [
  258, // Klasik Mor
  210, // Modern Mavi
  350, // Zarif Kırmızı/Gül
  160, // Ferah Yeşil
  30,  // Sıcak Turuncu/Altın
]

onMounted(() => {
  const randomHue = colorSchemes[Math.floor(Math.random() * colorSchemes.length)]
  document.documentElement.style.setProperty('--accent-hue', randomHue)
})

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
    <UApp>
      <!-- Nuxt auto-imports components. If components/layout/AuroraBg.vue exists, it might be LayoutAuroraBg or AuroraBg depending on config. -->
      <!-- Let's assume automatic scan. If it fails we can rename components. -->
      <LayoutAuroraBg :menuOpen="menuOpen" />
      <LayoutMainNavbar :menuOpen="menuOpen" @toggle-menu="toggleMenu" />

      <div id="main-content">
        <NuxtPage />
      </div>

      <NavigationOverlayMenu :active="menuOpen" @close="closeMenu" />
      <UToaster />
    </UApp>
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
