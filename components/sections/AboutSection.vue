<template>
  <section class="about" id="about">
    <div class="container">
      <div class="title-wrapper" @mousemove="handleTitleMove" @mouseleave="resetTitle">
        <h2
          class="section-title interactive-title"
          ref="titleRef"
        >
          WHO AM I
        </h2>
      </div>

      <div class="bio-container">
        <div class="bio-header">
          <h3>Burak Temur</h3>
        </div>
        <div class="bio-text">
          <p>
            Benim adım Burak Temur, 17 yaşındayım ve meslek lisesinde 12. sınıf öğrencisiyim. Şuanda
            yazılım üstüne lise stajımı <a href="https://trex.com.tr/tr/" target="_blank">TREX Dijital Manufacturing</a>' de yapmaktayım.
            Amacım yazılımda ve eğitim öğretim hayatımda kendimi geliştirmek.
          </p>
          <p>
            Eğer ortak ilgi alanlarımız varsa, iş görüşmesi yapmak istiyorsanız veya sadece sohbet etmek istiyorsanız benimle iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const titleRef = ref(null)

const handleTitleMove = (e) => {
  if (!titleRef.value) return
  const rect = titleRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const rotateX = -(y - centerY) / 35
  const rotateY = (x - centerX) / 35

  // Distance calculation (Wider area)
  const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
  const maxDist = 600 // Increased detection range
  let intensity = 1 - (distance / maxDist)
  intensity = Math.max(0, Math.min(1, intensity))

  titleRef.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${1 + intensity * 0.05})`

  // Dynamic Light Effects (Subtler/Reduced Height)
  // Max opacity reduced to 0.7, Shadow radius reduced to 20px
  titleRef.value.style.color = `rgba(244, 247, 251, ${intensity * 0.7})`
  titleRef.value.style.webkitTextStrokeColor = `rgba(255, 255, 255, ${0.15 * (1 - intensity)})`
  titleRef.value.style.textShadow = `0 0 ${intensity * 20}px var(--accent-glow)`
}

const resetTitle = () => {
  if (!titleRef.value) return
  titleRef.value.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
  titleRef.value.style.color = 'transparent'
  titleRef.value.style.webkitTextStrokeColor = 'rgba(255, 255, 255, 0.15)'
  titleRef.value.style.textShadow = 'none'
}
</script>

<style scoped>
.title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 150px 0;
  margin: -150px 0;
  position: relative;
  z-index: 10;
  cursor: default;
}

.bio-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 700px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  padding: 40px;
  border-radius: 32px;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.bio-header h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #fff;
  text-align: center;
}

.bio-text { color: var(--text-muted); }
.bio-text p { margin-bottom: 20px; font-size: 1.1rem; }
.hobbies ul { list-style: disc; margin-left: 20px; margin-bottom: 20px; }
.bio-text a { color: var(--accent-color); font-weight: 600; }
.bio-text a:hover { text-decoration: underline; }
</style>
