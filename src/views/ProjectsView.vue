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
            <div class="repo-header">
              <i class="ph-bold ph-folder-open"></i>
              <div class="repo-links">
                <a :href="repo.html_url" target="_blank" title="GitHub'da Görüntüle">
                  <i class="ph-bold ph-github-logo"></i>
                </a>
                <a
                  v-if="repo.homepage"
                  :href="repo.homepage"
                  target="_blank"
                  title="Canlı Önizleme"
                >
                  <i class="ph-bold ph-browser"></i>
                </a>
              </div>
            </div>
            <h3>{{ repo.name }}</h3>
            <p>{{ repo.description || 'Bu proje için bir açıklama girilmemiş.' }}</p>
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
  const rotateX = (y - centerY) / 10
  const rotateY = (centerX - x) / 10
  titleRef.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
}

const resetTitle = () => {
  if (!titleRef.value) return
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
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.06);
  border-color: var(--accent-color);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.repo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.repo-header > i {
  font-size: 2rem;
  color: var(--accent-color);
}

.repo-links {
  display: flex;
  gap: 15px;
}

.repo-links a {
  font-size: 1.5rem;
  opacity: 0.6;
  transition: 0.3s;
}

.repo-links a:hover {
  opacity: 1;
  color: var(--accent-color);
}

.project-card h3 {
  font-size: 1.4rem;
  margin-bottom: 12px;
  color: #fff;
}

.project-card p {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
