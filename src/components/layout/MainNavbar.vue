<template>
  <div class="nav-wrapper">
    <nav class="main-bar" @click="$emit('toggle-menu')" :class="{ 'menu-open': menuOpen }">
      <div class="nav-icon" :class="{ 'menu-open': menuOpen }">
        <span></span>
        <span></span>
      </div>
    </nav>
  </div>
</template>

<script setup>
defineProps({
  menuOpen: Boolean,
})
defineEmits(['toggle-menu'])
</script>

<style scoped>
.nav-wrapper {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3000;
  display: flex;
  align-items: center;
  gap: 15px;
}

.main-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: var(--glass-bg);
  width: 140px;
  height: 35px;
  border-radius: 100px;
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(15px);
  transition: all 0.4s var(--transition);
  position: relative;
  overflow: hidden;
}

.main-bar:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
}

.nav-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 100%;
  height: 100%;
  transition: 0.5s var(--transition);
}

.nav-icon span {
  display: block;
  width: 60px;
  height: 2px;
  background-color: var(--text-color);
  transition: all 0.5s var(--transition);
  border-radius: 2px;
}

.nav-icon.menu-open span:nth-child(1) {
  transform: translateY(4px) rotate(45deg);
  width: 30px;
}

.nav-icon.menu-open span:nth-child(2) {
  transform: translateY(-4px) rotate(-45deg);
  width: 30px;
}

@media (max-width: 600px) {
  .nav-wrapper {
    top: 20px;
  }
  .main-bar {
    width: 150px;
  }
  .nav-icon span {
    width: 25px;
  }
}
</style>
