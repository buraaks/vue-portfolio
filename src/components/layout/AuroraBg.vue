<template>
  <div class="background-wrapper" :class="{ 'menu-open': menuOpen }">
    <!-- Noise/Grain Overlay -->
    <div class="grain-overlay"></div>

    <!-- Smooth Mesh Blobs -->
    <div class="mesh-container">
      <div class="blob blob-indigo"></div>
      <div class="blob blob-purple"></div>
      <div class="blob blob-blue"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  menuOpen: Boolean,
})
</script>

<style scoped>
.background-wrapper {
  position: fixed;
  inset: 0;
  z-index: -1;
  background-color: var(--bg-color);
  overflow: hidden;
  pointer-events: none;
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Subtle parallax shift when menu opens */
.background-wrapper.menu-open {
  transform: scale(1.05);
}

.grain-overlay {
  position: absolute;
  inset: -100%;
  width: 300%;
  height: 300%;
  background-image: url('https://grainy-gradients.vercel.app/noise.svg');
  opacity: 0.15;
  pointer-events: none;
  z-index: 2;
  animation: noise 2s steps(10) infinite;
}

.mesh-container {
  position: absolute;
  inset: 0;
  filter: blur(140px);
  z-index: 1;
  opacity: 0.25; /* Fixed base opacity to prevent flashing */
  transition: opacity 2s var(--transition);
}

/* Slightly increase brightness when menu is open, but without flashing */
.menu-open .mesh-container {
  opacity: 0.45;
}

.blob {
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: screen;
  animation: float 25s infinite alternate ease-in-out;
}

.blob-indigo {
  width: 60vw;
  height: 60vw;
  background: radial-gradient(circle, var(--accent-color) 0%, transparent 70%);
  top: -10%;
  left: -10%;
}

.blob-purple {
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
  bottom: -5%;
  right: -5%;
  animation-delay: -7s;
}

.blob-blue {
  width: 45vw;
  height: 45vw;
  background: radial-gradient(circle, #0ea5e9 0%, transparent 70%);
  top: 30%;
  left: 30%;
  animation-delay: -14s;
}

@keyframes float {
  0% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(10%, -5%) scale(1.1);
  }
  66% {
    transform: translate(-5%, 8%) scale(0.9);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

@keyframes noise {
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-1%, -2%);
  }
  20% {
    transform: translate(-3%, 1%);
  }
  30% {
    transform: translate(1%, -1%);
  }
  40% {
    transform: translate(-2%, 2%);
  }
  50% {
    transform: translate(-1%, -3%);
  }
  60% {
    transform: translate(2%, 1%);
  }
  70% {
    transform: translate(1%, 2%);
  }
  80% {
    transform: translate(-2%, 1%);
  }
  90% {
    transform: translate(2%, -1%);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
