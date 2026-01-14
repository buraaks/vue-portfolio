<template>
  <footer class="site-footer">
    <div class="container footer-content">
      <span class="footer-left">©2026 Burak Temur. Tüm hakları saklıdır.</span>
      <span class="footer-right">"Kod yazmak, hayalleri gerçeğe dönüştürmektir."</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 40px 20px;
  border-top: 1px solid var(--glass-border);
  color: var(--text-muted);
  font-size: 0.9rem;
  background: color-mix(in srgb, var(--bg-color), transparent 50%);
  backdrop-filter: blur(10px);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 600px) {
  .footer-content {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}
</style>
