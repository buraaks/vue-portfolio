<template>
  <div class="page-container">
    <div class="container">
      <h1
        class="section-title interactive-title"
        ref="titleRef"
        @mousemove="handleTitleMove"
        @mouseleave="resetTitle"
      >
        CONTACT
      </h1>

      <div class="contact-wrapper">
        <div class="contact-info">
          <h2>Bana Ulaşın</h2>
          <p>
            Yeni projeler, iş teklifleri veya sadece kahve içip sohbet etmek için bana
            ulaşabilirsiniz.
          </p>

          <div class="social-list">
            <div v-for="social in socials" :key="social.label" class="social-card">
              <a :href="social.url" target="_blank">
                <i :class="social.icon"></i>
                <div class="social-meta">
                  <span class="label">{{ social.label }}</span>
                  <span class="value">{{ social.value }}</span>
                </div>
              </a>
              <button
                class="copy-btn"
                @click="copy(social.value)"
                :class="{ copied: copied === social.value }"
              >
                <i :class="copied === social.value ? 'ph-bold ph-check' : 'ph ph-copy'"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  const rotateX = (y - centerY) / 10
  const rotateY = (centerX - x) / 10
  titleRef.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
}

const resetTitle = () => {
  if (!titleRef.value) return
  titleRef.value.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
}

const socials = [
  {
    label: 'Email',
    value: 'buraktemur@email.com',
    url: 'mailto:buraktemur@email.com',
    icon: 'ph-bold ph-envelope',
  },
  {
    label: 'LinkedIn',
    value: 'burak-temur',
    url: 'https://linkedin.com/in/burak-temur-a39432300/',
    icon: 'ph-bold ph-linkedin-logo',
  },
  {
    label: 'Instagram',
    value: '@burak._.tmr8',
    url: 'https://instagram.com/burak._.tmr8/',
    icon: 'ph-bold ph-instagram-logo',
  },
]

const copied = ref('')
const copy = (text) => {
  navigator.clipboard.writeText(text)
  copied.value = text
  setTimeout(() => (copied.value = ''), 2000)
}
</script>

<style scoped>
.page-container {
  padding: 140px 20px 80px;
  min-height: 100vh;
}

.interactive-title {
  display: block;
  cursor: default;
  transition:
    transform 0.1s ease-out,
    color 0.5s var(--transition),
    text-shadow 0.5s var(--transition);
  margin-bottom: 60px;
}

.interactive-title:hover {
  color: var(--text-color);
  -webkit-text-stroke: 0px;
  text-shadow: 0 0 40px rgba(99, 102, 241, 0.4);
}

.contact-wrapper {
  max-width: 800px;
  margin: 50px auto;
}

.contact-info h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.contact-info p {
  color: var(--text-muted);
  margin-bottom: 40px;
  font-size: 1.1rem;
}

.social-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.social-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  transition: 0.3s;
}

.social-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--accent-color);
  transform: translateX(10px);
}

.social-card a {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.social-card i {
  font-size: 2rem;
  color: var(--accent-color);
}

.social-meta {
  display: flex;
  flex-direction: column;
}

.social-meta .label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

.social-meta .value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
}

.copy-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.3s;
}

.copy-btn:hover {
  background: var(--accent-color);
}

.copy-btn.copied {
  background: #10b981;
}
</style>
