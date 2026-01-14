<template>
  <div class="skills-page">
    <div class="container">
      <div class="title-wrapper" @mousemove="handleTitleMove" @mouseleave="resetTitle">
        <h1
          class="section-title interactive-title"
          ref="titleRef"
        >
          SKILLS
        </h1>
      </div>

      <div class="skills-grid">
        <!-- FRONTEND -->
        <div class="skill-card" v-for="(category, index) in skillsData" :key="index">
          <div class="card-header">
            <div class="icon-box">
              <i :class="category.icon"></i>
            </div>
            <h3>{{ category.title }}</h3>
          </div>
          <div class="skills-list">
            <div
              v-for="skill in category.skills"
              :key="skill.name"
              class="skill-item"
              :style="{ '--skill-color': category.color }"
            >
              <span class="skill-dot"></span>
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CURRENTLY LEARNING -->
      <div class="learning-section">
        <div class="learning-card">
          <div class="learning-content">
            <div class="learning-label">
              <i class="ph-bold ph-lightning-light"></i>
              SHU AN ÖĞRENDİKLERİM
            </div>
            <div class="learning-tags">
              <span v-for="tag in currentLearning" :key="tag" class="tag">{{ tag }}</span>
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

const skillsData = [
  {
    title: 'Frontend Development',
    icon: 'ph-bold ph-layout',
    color: '#6366f1',
    skills: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }, { name: 'UI/UX Design' }],
  },
  {
    title: 'Backend & Database',
    icon: 'ph-bold ph-database',
    color: '#10b981',
    skills: [{ name: 'C#' }, { name: 'SQL' }, { name: 'Web API Design' }],
  },
  {
    title: 'Tools & Development',
    icon: 'ph-bold ph-wrench',
    color: '#f59e0b',
    skills: [{ name: 'WinForms' }, { name: 'Git / GitHub' }, { name: 'VS Code' }],
  },
]

const currentLearning = ['Vue.js', 'Python']

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
  titleRef.value.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
}
</script>

<style scoped>
.skills-page {
  padding: 140px 20px 80px;
  min-height: 100vh;
  background: transparent;
}

.title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.skill-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  border-radius: 30px;
  padding: 40px;
  backdrop-filter: blur(10px);
  transition: all 0.5s var(--transition);
  position: relative;
  overflow: hidden;
}

.skill-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.icon-box {
  width: 50px;
  height: 50px;
  background: var(--accent-soft);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--accent-color);
}

.card-header h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
}

.skills-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.skill-item:hover {
  background: rgba(255, 255, 255, 0.08);
  padding-left: 20px;
}

.skill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--skill-color);
  box-shadow: 0 0 10px var(--skill-color);
}

.skill-name {
  font-size: 1rem;
  color: var(--text-muted);
  font-weight: 500;
  transition: color 0.3s ease;
}

.skill-item:hover .skill-name {
  color: #fff;
}

/* Learning Section */
.learning-section {
  max-width: 800px;
  margin: 0 auto;
}

.learning-card {
  background: linear-gradient(90deg, var(--accent-soft), transparent);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 30px;
  position: relative;
  overflow: hidden;
}

.learning-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
}

.learning-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  color: var(--accent-color);
}

.learning-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.tag {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
  padding: 8px 20px;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color);
  transition: all 0.3s ease;
}

.tag:hover {
  background: var(--accent-color);
  border-color: var(--accent-color);
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    margin-bottom: 40px;
  }
}
</style>
