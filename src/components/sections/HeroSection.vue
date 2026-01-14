<template>
  <section class="hero" id="hero">
    <h1 class="hero-title">BURAK</h1>
    <p class="hero-subtitle">Developer & Student</p>
    <div class="scroll-indicator" @click="scrollToAbout">
      <i class="ph ph-arrow-down"></i>
    </div>
  </section>
</template>

<script setup>
const scrollToAbout = () => {
  const aboutSection = document.getElementById('about')
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>

<style scoped>
.hero {
  flex-direction: column;
  position: relative;
  background: transparent;
}

.hero-title {
  font-size: clamp(4rem, 15vw, 12rem);
  font-weight: 900;
  letter-spacing: -0.05em;
  margin: 0;
  background: linear-gradient(135deg, #fff 30%, var(--accent-color));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 10px 30px var(--accent-soft));
  animation: fadeInUp 1.2s var(--transition) forwards;
  user-select: none;
  -webkit-user-select: none;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 400;
  color: var(--text-muted);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-top: -10px;
  opacity: 0;
  animation: fadeInUp 1.2s var(--transition) forwards 0.4s;
  user-select: none;
  -webkit-user-select: none;
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  font-size: 1.5rem;
  animation: bounce 2s infinite;
  cursor: pointer;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style>
