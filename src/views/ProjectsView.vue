<template>
  <div class="page-container">
    <div class="container">
      <h1
        class="section-title interactive-title"
        ref="titleRef"
        @mousemove="handleTitleMove"
        @mouseleave="resetTitle"
      >
        PROJECTS
      </h1>

      <div v-if="loading" class="loading-state">
        <div class="loader"></div>
        <p>GitHub'dan projeler çekiliyor...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
      </div>

      <div v-else class="projects-grid">
        <div v-for="repo in repos" :key="repo.id" class="project-card">
          <div class="card-content">
            <h3>{{ repo.name }}</h3>
            <p>{{ repo.description || 'Bu proje için bir açıklama girilmemiş.' }}</p>

            <div class="card-actions">
              <a :href="repo.html_url" target="_blank" class="action-btn primary" title="GitHub'da Görüntüle">
                <i class="ph-bold ph-github-logo"></i>
                <span>Source</span>
              </a>
              <a
                v-if="repo.homepage"
                :href="repo.homepage"
                target="_blank"
                class="action-btn secondary"
                title="Canlı Önizleme"
              >
                <i class="ph-bold ph-arrow-up-right"></i>
                <span>Live</span>
              </a>
            </div>

            <div class="card-footer">
              <span class="language">
                <span
                  class="lang-dot"
                  :style="{ backgroundColor: getLangColor(repo.language) }"
                ></span>
                {{ repo.language || 'Plain Text' }}
              </span>
              <span class="stars">
                <i class="ph-fill ph-star"></i> {{ repo.stargazers_count }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const titleRef = ref(null)

const handleTitleMove = (e) => {
  if (!titleRef.value) return
  const rect = titleRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2

  // Hassasiyeti azalttık (10 -> 35)
  const rotateX = (y - centerY) / 35
  const rotateY = (centerX - x) / 35

  // Hareket anında geçiş süresini sıfırlıyoruz ki Mouse'u anlık takip etsin
  titleRef.value.style.transition = 'none'
  titleRef.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
}

const resetTitle = () => {
  if (!titleRef.value) return
  // Çıkınca yumuşakça eski haline dönmesi için transition ekliyoruz
  titleRef.value.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
  titleRef.value.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
}

const repos = ref([])
const loading = ref(true)
const error = ref(null)

const fetchRepos = async () => {
  try {
    const response = await fetch('https://api.github.com/users/buraaks/repos?sort=updated')
    if (!response.ok) throw new Error('GitHub verileri alınamadı.')
    const data = await response.json()
    // Fork edilmemiş ve en son güncellenen 12 projeyi al
    repos.value = data.filter((repo) => !repo.fork).slice(0, 12)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const getLangColor = (lang) => {
  const colors = {
    JavaScript: '#f1e05a',
    Vue: '#41b883',
    HTML: '#e34c26',
    CSS: '#563d7c',
    'C#': '#178600',
    Python: '#3572A5',
    TypeScript: '#3178c6',
  }
  return colors[lang] || '#8896a8'
}

onMounted(fetchRepos)
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
    color 0.5s var(--transition),
    text-shadow 0.5s var(--transition);
  margin-bottom: 60px;
  will-change: transform;
}

.interactive-title:hover {
  color: var(--text-color);
  -webkit-text-stroke: 0px;
  text-shadow: 0 0 40px var(--accent-glow);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 50px;
}

.project-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 30px;
  transition: all 0.4s var(--transition);
  position: relative;
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.06);
  border-color: var(--accent-color);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.project-card h3 {
  font-size: 1.4rem;
  margin-bottom: 12px;
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
}

.project-card h3::before {
  content: '';
  width: 3px;
  height: 1.1rem;
  background: var(--accent-color);
  border-radius: 10px;
  display: block;
  box-shadow: 0 0 10px var(--accent-glow);
}

.project-card p {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.6;
}

.card-actions {
  display: flex;
  gap: 12px;
  margin-top: auto; /* Bunu en alta iter */
  margin-bottom: 25px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s var(--transition);
  text-decoration: none;
}

.action-btn.primary {
  background: var(--accent-color);
  color: #fff;
  border: 1px solid var(--accent-color);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-color);
  border: 1px solid var(--glass-border);
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px var(--accent-glow);
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--accent-color);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.language {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lang-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 100px 0;
}

.loader {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
