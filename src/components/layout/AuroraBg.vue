<template>
  <div class="aurora-container" :class="{ 'menu-open': menuOpen }">
    <div class="aurora aurora-1"></div>
    <div class="aurora aurora-2"></div>
    <div class="aurora aurora-3"></div>
  </div>
</template>

<script setup>
defineProps({
  menuOpen: Boolean
})
</script>

<style scoped>
.aurora-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  opacity: 0.15;
  pointer-events: none;
  transition: opacity 1.5s var(--transition);
}

.aurora-container.menu-open {
  opacity: 0.6;
}

.aurora {
  position: absolute;
  width: 60vw;
  height: 60vw;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.3;
  animation: auroraMove 20s infinite alternate var(--transition);
}

.aurora-1 {
  background: radial-gradient(circle, var(--accent-color) 0%, transparent 70%);
  top: -20%;
  left: -10%;
}

.aurora-2 {
  background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
  bottom: -10%;
  right: -10%;
  animation-delay: -5s;
}

.aurora-3 {
  background: radial-gradient(circle, #0ea5e9 0%, transparent 70%);
  top: 40%;
  left: 40%;
  animation-delay: -10s;
}

@keyframes auroraMove {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(10%, 10%) scale(1.2);
  }
}
</style>
