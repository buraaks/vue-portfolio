<template>
  <div class="overlay-nav" :class="{ active: active }">
    <div class="nav-content">
      <div class="grid-container">
        <!-- GİRİŞ (Top Wide) -->
        <router-link
          to="/"
          class="grid-item-btn item-home"
          :class="{ show: active }"
          @click="$emit('close')"
        >
          <i class="ph-bold ph-house"></i>
          <span>Giriş</span>
        </router-link>

        <!-- PROJELER (Left Top) -->
        <router-link
          to="/projects"
          class="grid-item-btn item-projects"
          :class="{ show: active }"
          @click="$emit('close')"
        >
          <i class="ph-bold ph-code"></i>
          <span>Projeler</span>
        </router-link>

        <!-- YETENEKLER (Left Bottom) -->
        <router-link
          to="/skills"
          class="grid-item-btn item-skills"
          :class="{ show: active }"
          @click="$emit('close')"
        >
          <i class="ph-bold ph-lightning"></i>
          <span>Yetenekler</span>
        </router-link>

        <!-- İLETİŞİM (Right Tall) -->
        <router-link
          to="/contact"
          class="grid-item-btn item-contact"
          :class="{ show: active }"
          @click="$emit('close')"
        >
          <div class="contact-inner">
            <i class="ph-bold ph-envelope"></i>
            <span>İletişim</span>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Close Trigger (Background) -->
    <div class="overlay-close-trigger" @click="$emit('close')"></div>
  </div>
</template>

<script setup>
defineProps({
  active: Boolean,
})

defineEmits(['close'])
</script>

<style scoped>
.overlay-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  visibility: hidden;
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  backdrop-filter: blur(0px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.overlay-nav.active {
  visibility: visible;
  opacity: 1;
  backdrop-filter: blur(40px);
}

.nav-content {
  width: min(90vw, 700px);
  z-index: 10;
}

.grid-container {
  display: grid;
  grid-template-columns: 1.3fr 0.7fr; /* Left wider, right narrower */
  grid-template-rows: auto auto auto;
  gap: 20px;
}

.grid-item-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
  border-radius: 30px;
  padding: 35px;
  color: #fff;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  font-weight: 700;
  font-size: 1.3rem; /* %20 increased */
  transition: all 0.5s var(--transition);
  opacity: 0;
  transform: translateY(20px);
}

.grid-item-btn.show {
  opacity: 1;
  transform: translateY(0);
}

.grid-item-btn i {
  font-size: 2.5rem; /* %20 increased */
  color: var(--accent-color);
}

.grid-item-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--accent-color);
  transform: scale(1.02);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Custom Spans to Match Sketch */
.item-home {
  grid-column: span 2;
  height: 170px; /* %20 increased */
  transition-delay: 0.1s;
}

.item-projects {
  grid-column: 1;
  height: 130px; /* %20 increased */
  transition-delay: 0.15s;
}

.item-skills {
  grid-column: 1;
  height: 130px; /* %20 increased */
  transition-delay: 0.2s;
}

.item-contact {
  grid-column: 2;
  grid-row: 2 / span 2; /* Spans Projeler and Yetenekler height */
  height: 100%;
  transition-delay: 0.25s;
}

.item-contact .contact-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 15px;
}

@media (max-width: 480px) {
  .nav-content {
    width: 95vw;
  }
  .grid-item-btn {
    padding: 20px;
  }
}

.overlay-close-trigger {
  position: absolute;
  inset: 0;
  z-index: 5;
}
</style>
