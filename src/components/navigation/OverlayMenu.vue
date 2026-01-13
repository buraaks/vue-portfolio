<template>
  <div class="overlay-nav" :class="{ active: active }">
    <div class="overlay-blur"></div>

    <div class="nav-container">
      <!-- Horizontal Tabs -->
      <div class="nav-tabs-container">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="nav-tab-btn"
          :class="{ active: currentTab === tab.id }"
          @click="currentTab = tab.id"
        >
          <i :class="tab.icon"></i>
          <span>{{ tab.label }}</span>
        </button>
      </div>

      <!-- Center Content Window -->
      <div class="nav-center-window">
        <div class="window-content">
          <!-- Home Pane -->
          <div class="content-pane" :class="{ active: currentTab === 'home' }">
            <h2>Hoş Geldiniz</h2>
            <p class="pane-lead">
              Navigasyon menüsünü kullanarak projelerime, yeteneklerime ve
              iletişim bilgilerime hızlıca ulaşabilirsiniz.
            </p>
            <div class="quick-status">
              <span><i class="ph-fill ph-check-circle"></i> Kullanılabilir</span>
              <span><i class="ph-fill ph-map-pin"></i> Türkiye</span>
            </div>
          </div>

          <!-- Projects Pane -->
          <div class="content-pane" :class="{ active: currentTab === 'projects' }">
            <h2>Projelerim</h2>
            <div id="projects-container">
              <div v-if="loadingRepos" class="loading-text">Projeler yükleniyor...</div>
              <div v-else-if="reposError" class="loading-text">{{ reposError }}</div>
              <div v-else class="projects-grid">
                <div
                  v-for="(repo, index) in repos"
                  :key="repo.id"
                  class="project-item"
                  :style="{ animationDelay: index * 0.1 + 's' }"
                >
                  <h3>{{ repo.name }}</h3>
                  <p>{{ repo.description || 'Bu proje için bir açıklama bulunmuyor.' }}</p>
                  <div class="project-footer">
                    <span class="repo-lang">{{ repo.language || 'Code' }}</span>
                    <a :href="repo.html_url" target="_blank" class="project-link">
                      <i class="ph ph-arrow-up-right"></i> GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Pane -->
          <div class="content-pane" :class="{ active: currentTab === 'skills' }">
            <h2>Yetenekler & Gelişim</h2>

            <div class="pane-section">
              <h3 class="pane-subtitle">Teknik Yetkinlikler</h3>
              <div class="skills-grid">
                <div v-for="skill in technicalSkills" :key="skill" class="skill-tag">{{ skill }}</div>
              </div>
            </div>

            <div class="pane-section">
              <h3 class="pane-subtitle">Öğrenim Yolculuğu</h3>
              <div class="skills-grid">
                <div v-for="skill in learningJourney" :key="skill" class="skill-tag">{{ skill }}</div>
              </div>
            </div>
          </div>

          <!-- Contact Pane -->
          <div class="content-pane" :class="{ active: currentTab === 'contact' }">
            <h2>İletişim</h2>
            <p>Benimle aşağıdaki kanallardan iletişime geçebilirsiniz.</p>
            <div class="social-grid">
              <div
                v-for="social in socials"
                :key="social.label"
                class="social-link-wrapper"
              >
                <a :href="social.url" target="_blank" class="social-link">
                  <i :class="social.icon"></i>
                  {{ social.label }}
                </a>
                <span
                  class="copy-trigger"
                  @click.stop="copyToClipboard(social.copyText)"
                  :title="copiedText === social.copyText ? 'Kopyalandı!' : 'Kopyala'"
                  :class="{ copied: copiedText === social.copyText }"
                >
                  <i :class="copiedText === social.copyText ? 'ph-bold ph-check' : 'ph ph-copy'"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Close Trigger (Background) -->
    <div class="overlay-close-trigger" @click="$emit('close')"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  active: Boolean
})

const emit = defineEmits(['close'])

const currentTab = ref('home')
const tabs = [
  { id: 'home', label: 'Giriş', icon: 'ph-bold ph-house' },
  { id: 'projects', label: 'Projeler', icon: 'ph-bold ph-code' },
  { id: 'skills', label: 'Yetenekler', icon: 'ph-bold ph-lightning' },
  { id: 'contact', label: 'İletişim', icon: 'ph-bold ph-envelope' }
]

const technicalSkills = ['C# / .NET', 'SQL Server', 'UI/UX Design', 'WPF / WinForms', 'API Design']
const learningJourney = ['HTML & CSS', 'JavaScript', 'Python']

const socials = [
  { label: 'Email', url: 'mailto:buraktemur@email.com', icon: 'ph-bold ph-envelope', copyText: 'buraktemur@email.com' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/burak-temur-a39432300/', icon: 'ph-bold ph-linkedin-logo', copyText: 'https://linkedin.com/in/burak-temur-a39432300/' },
  { label: 'Instagram', url: 'https://instagram.com/burak._.tmr8/', icon: 'ph-bold ph-instagram-logo', copyText: 'https://instagram.com/burak._.tmr8/' }
]

const repos = ref([])
const loadingRepos = ref(true)
const reposError = ref(null)

const fetchRepos = async () => {
  try {
    const response = await fetch('https://api.github.com/users/buraaks/repos?sort=updated')
    if (!response.ok) throw new Error('GitHub API bağlantısı başarısız.')
    const data = await response.json()
    repos.value = data.filter(repo => !repo.fork).slice(0, 10)
  } catch (error) {
    console.error('Error fetching repos:', error)
    reposError.value = 'Projeler yüklenirken bir hata oluştu.'
  } finally {
    loadingRepos.value = false
  }
}

const copiedText = ref('')
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    copiedText.value = text
    setTimeout(() => {
      copiedText.value = ''
    }, 2000)
  })
}

onMounted(() => {
  fetchRepos()
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && props.active) {
      emit('close')
    }
  })
})
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
  align-items: center;
  justify-content: center;
  clip-path: circle(0% at 50% 48px);
  transition: opacity 0.4s var(--transition), visibility 0.4s var(--transition),
    clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.overlay-nav.active {
  visibility: visible;
  opacity: 1;
  clip-path: circle(150% at 50% 48px);
}

.overlay-blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(12, 18, 34, 0.85);
  backdrop-filter: blur(40px) saturate(150%);
}

.nav-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: min(95vw, 900px);
  z-index: 10;
}

.nav-tabs-container {
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
}

.nav-tab-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(15px);
  color: var(--text-color);
  padding: 12px 0;
  width: 160px;
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition:
    background 0.3s var(--transition),
    border-color 0.3s var(--transition),
    transform 0.4s var(--transition),
    box-shadow 0.3s var(--transition);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(30px);
}

.overlay-nav.active .nav-tab-btn {
  opacity: 1;
  transform: translateY(0);
}

.nav-tab-btn:nth-child(1) { transition-delay: 0.1s; }
.nav-tab-btn:nth-child(2) { transition-delay: 0.15s; }
.nav-tab-btn:nth-child(3) { transition-delay: 0.2s; }
.nav-tab-btn:nth-child(4) { transition-delay: 0.25s; }

.nav-tab-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--accent-color);
  transform: translateY(-4px) scale(1.12, 1.04);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.2);
}

.nav-tab-btn.active {
  background: var(--accent-color);
  border-color: rgba(255, 255, 255, 0.8);
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.4);
}

.nav-center-window {
  width: 100%;
  height: min(65vh, 550px);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  border-radius: 40px;
  padding: 30px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  scrollbar-width: none;
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.5s var(--transition) 0.3s;
}

.overlay-nav.active .nav-center-window {
  opacity: 1;
  transform: scale(1);
}

.content-pane {
  opacity: 0;
  visibility: hidden;
  transform: translateY(15px);
  transition: all 0.4s var(--transition);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.content-pane.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  position: relative;
}

.content-pane h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 25px;
  background: linear-gradient(135deg, #fff 0%, var(--accent-color) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.pane-lead {
  font-size: 1.1rem;
  color: var(--text-color);
  margin-bottom: 30px;
  opacity: 0.8;
}

.quick-status {
  display: flex;
  gap: 20px;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.quick-status span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.quick-status i {
  color: #10b981;
}

.pane-section { margin-bottom: 40px; }
.pane-subtitle {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent-color);
  margin-bottom: 20px;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 10px;
}
.pane-subtitle::after {
  content: '';
  height: 1px;
  flex: 1;
  background: linear-gradient(to right, rgba(99, 102, 241, 0.2), transparent);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

.skill-tag {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
  padding: 12px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  transition: 0.3s;
}

.skill-tag:hover {
  background: var(--accent-color);
  border-color: var(--accent-color);
  transform: translateY(-3px);
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 20px;
}

.social-link-wrapper { position: relative; }

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
  padding: 20px;
  border-radius: 20px;
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 700;
  transition: 0.3s;
}

.social-link i { font-size: 1.5rem; }

.social-link:hover {
  background: var(--accent-color);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
}

.copy-trigger {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: 0.3s;
  cursor: pointer;
}

.social-link-wrapper:hover .copy-trigger { opacity: 1; }
.copy-trigger.copied { background: #10b981; color: #fff; }

.project-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  padding: 24px;
  border-radius: 20px;
  margin-bottom: 20px;
  animation: projectFadeIn 0.6s var(--transition) forwards;
  opacity: 0;
  transition: 0.4s;
}

.project-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--accent-color);
  transform: translateY(-5px);
}

@keyframes projectFadeIn {
  to { opacity: 1; transform: translateY(0); }
  from { opacity: 0; transform: translateY(20px); }
}

.project-item h3 { color: var(--accent-color); font-size: 1.2rem; }
.project-item p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 10px; }
.project-footer { display: flex; justify-content: space-between; align-items: center; }
.repo-lang { background: rgba(99, 102, 241, 0.1); color: var(--accent-color); padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; }
.project-link { color: var(--text-color); text-decoration: none; font-size: 0.8rem; font-weight: 700; }

.overlay-close-trigger {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: 5;
}
</style>
