<template>
  <div class="page-container">
    <div class="container">
      <h1 class="section-title">Yetenekler</h1>

      <div class="skills-sections">
        <section class="skill-group">
          <h2>Teknik Yetkinlikler</h2>
          <div class="skills-grid">
            <div v-for="skill in technicalSkills" :key="skill" class="skill-pill">
              <i class="ph-bold ph-check-circle"></i>
              {{ skill }}
            </div>
          </div>
        </section>

        <section class="skill-group">
          <h2>Şu An Öğrendiklerim</h2>
          <div class="skills-grid">
            <div v-for="skill in learningJourney" :key="skill" class="skill-pill learning">
              <i class="ph-bold ph-lightning"></i>
              {{ skill }}
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
const technicalSkills = [
  'C# / .NET',
  'SQL Server',
  'UI/UX Design',
  'WPF / WinForms',
  'API Design',
  'Node.js',
]
const learningJourney = ['HTML & CSS', 'JavaScript', 'Python', 'Vue.js', 'Nuxt.js']
</script>

<style scoped>
.page-container {
  padding-top: 120px;
  min-height: 100vh;
}

.skills-sections {
  display: flex;
  flex-direction: column;
  gap: 60px;
  margin-top: 50px;
}

.skill-group h2 {
  font-size: 2rem;
  margin-bottom: 30px;
  color: #fff;
  opacity: 0.9;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.skill-pill {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  transition: 0.3s var(--transition);
}

.skill-pill i {
  color: var(--accent-color);
  font-size: 1.4rem;
}

.skill-pill:hover {
  background: rgba(99, 102, 241, 0.1);
  border-color: var(--accent-color);
  transform: translateX(10px);
}

.skill-pill.learning i {
  color: #fbbf24;
}
</style>
