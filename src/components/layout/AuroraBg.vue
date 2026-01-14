<template>
  <div class="bg-container">
    <!-- Static Base Layer -->
    <div class="base-gradient"></div>

    <!-- Ambient Glow - Always animating -->
    <div class="ambient-glow"></div>

    <!-- Menu State Layer - Fades in/out -->
    <Transition name="menu-fade">
      <div v-if="menuOpen" class="menu-accent"></div>
    </Transition>

    <!-- Noise Texture -->
    <div class="noise-layer"></div>
  </div>
</template>

<script setup>
defineProps({
  menuOpen: Boolean,
})
</script>

<style scoped>
.bg-container {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: var(--bg-color);
  overflow: hidden;
  pointer-events: none;
}

/* Static Dark Gradient Base */
.base-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, var(--bg-color) 0%, color-mix(in srgb, var(--accent-color), black 90%) 40%, color-mix(in srgb, var(--accent-color), black 85%) 100%);
}

/* Ambient Glow - Continuous subtle movement */
.ambient-glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle 600px at 20% 20%, var(--accent-soft) 0%, transparent 60%),
    radial-gradient(circle 500px at 80% 80%, var(--accent-glow) 0%, transparent 60%);
  animation: ambient-drift 30s ease-in-out infinite alternate;
}

/* Menu Accent Layer */
.menu-accent {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle 800px at 50% 50%, var(--accent-glow) 0%, transparent 50%);
  pointer-events: none;
}

/* Vue Transition Classes */
.menu-fade-enter-active {
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.menu-fade-leave-active {
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}

/* Noise Texture */
.noise-layer {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  opacity: 0.02;
  pointer-events: none;
}

/* Ambient Animation */
@keyframes ambient-drift {
  0% {
    transform: scale(1) translate(0, 0);
  }
  100% {
    transform: scale(1.1) translate(2%, 2%);
  }
}
</style>
