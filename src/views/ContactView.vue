<template>
  <div class="page-container">
    <div class="container">
      <div class="title-wrapper" @mousemove="handleTitleMove" @mouseleave="resetTitle">
        <h1
          class="section-title interactive-title"
          ref="titleRef"
        >
          CONTACT
        </h1>
      </div>

      <div class="contact-grid">
        <!-- Sol Taraf: Bilgiler ve Sosyal Medya -->
        <div class="contact-info">
          <div class="info-header">
            <h2>Bana Ulaşın</h2>
            <p>
              Yeni projeler, iş teklifleri veya sadece kahve içip sohbet etmek için bana
              ulaşabilirsiniz.
            </p>
          </div>

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

        <!-- Sağ Taraf: İletişim Formu -->
        <div class="contact-form-container">
          <form
            action="https://formspree.io/f/mdaakool"
            method="POST"
            class="contact-form"
          >
            <div class="form-group">
              <label for="name">İsim</label>
              <input type="text" id="name" name="name" placeholder="Adınız Soyadınız" required>
            </div>

            <div class="form-group">
              <label for="email">E-posta</label>
              <input type="email" id="email" name="email" placeholder="ornek@mail.com" required>
            </div>

            <div class="form-group">
              <label for="subject">Konu</label>
              <input type="text" id="subject" name="subject" placeholder="Neyle ilgili?" required>
            </div>

            <div class="form-group">
              <label for="message">Mesajınız</label>
              <textarea id="message" name="message" rows="5" placeholder="Mesajınızı buraya yazın..." required></textarea>
            </div>

            <button type="submit" class="submit-btn">
              <span>Gönder</span>
              <i class="ph-bold ph-paper-plane-tilt"></i>
            </button>
          </form>
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

  const rotateX = -(y - centerY) / 35
  const rotateY = (x - centerX) / 35

  // Distance calculation (Wider area)
  const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
  const maxDist = 600 // Increased detection range
  let intensity = 1 - (distance / maxDist)
  intensity = Math.max(0, Math.min(1, intensity))

  titleRef.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${1 + intensity * 0.05})`

  // Dynamic Light Effects (Subtler/Reduced Height)
  titleRef.value.style.color = `rgba(244, 247, 251, ${intensity * 0.7})`
  titleRef.value.style.webkitTextStrokeColor = `rgba(255, 255, 255, ${0.15 * (1 - intensity)})`
  titleRef.value.style.textShadow = `0 0 ${intensity * 20}px var(--accent-glow)`
}

const resetTitle = () => {
  if (!titleRef.value) return
  titleRef.value.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
  titleRef.value.style.color = 'transparent'
  titleRef.value.style.webkitTextStrokeColor = 'rgba(255, 255, 255, 0.15)'
  titleRef.value.style.textShadow = 'none'
}

const socials = [
  {
    label: 'Email',
    value: 'buraktemur@gmail.com',
    url: 'mailto:buraktemur@gmail.com',
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

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 60px;
  max-width: 1100px;
  margin: 50px auto;
  align-items: start;
}

.contact-info h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #fff;
}

.contact-info p {
  color: var(--text-muted);
  margin-bottom: 40px;
  font-size: 1.1rem;
  line-height: 1.6;
}

/* Form Styles */
.contact-form-container {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  padding: 40px;
  border-radius: 32px;
  backdrop-filter: blur(10px);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  margin-left: 5px;
}

.form-group input,
.form-group textarea {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 15px;
  color: #fff;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s var(--transition);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 20px var(--accent-glow);
}

.submit-btn {
  background: var(--accent-color);
  color: #fff;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s var(--transition);
  margin-top: 10px;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px var(--accent-glow);
}

.submit-btn:active {
  transform: translateY(-1px);
}

.social-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.social-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 25px;
  transition: 0.3s;
}

.social-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--accent-color);
  transform: translateX(10px);
}

.social-card a {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
}

.social-card i {
  font-size: 1.8rem;
  color: var(--accent-color);
}

.social-meta {
  display: flex;
  flex-direction: column;
}

.social-meta .label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

.social-meta .value {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
}

.copy-btn {
  background: rgba(255, 255, 255, 0.08);
  border: none;
  color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
}

.copy-btn:hover {
  background: var(--accent-color);
}

.copy-btn.copied {
  background: #10b981;
}

@media (max-width: 968px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
