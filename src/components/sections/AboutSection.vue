<template>
  <section class="about" id="about">
    <div class="container">
      <h2
        class="section-title interactive-title"
        ref="titleRef"
        @mousemove="handleTitleMove"
        @mouseleave="resetTitle"
      >
        WHO AM I
      </h2>

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
          <div class="hobbies">
            <p>Hobilerim;</p>
            <ul>
              <li>Yazılım Geliştirme</li>
              <li>Sanat</li>
              <li>Yeni Şeyler Öğrenmek</li>
              <li>Vibe coding ile işe yarar açık kaynak proje yapmak. örnek: <a href="https://github.com/buraaks/OverlayPlayer" target="_blank">OverlayPlayer</a></li>
            </ul>
          </div>
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

  titleRef.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
}

const resetTitle = () => {
  if (!titleRef.value) return
  titleRef.value.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
}
</script>

<style scoped>
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
