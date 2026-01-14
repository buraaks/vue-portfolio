<script setup>
defineOptions({
  name: 'IndexPage',
})
import HeroSection from '../components/sections/HeroSection.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import SiteFooter from '../components/layout/SiteFooter.vue'
</script>

<template>
  <main>
    <HeroSection />
    <AboutSection />
    <SiteFooter />
  </main>
</template>
