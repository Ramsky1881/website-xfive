<template>
  <div>
    <h1 class="neon-text mb-md">Dashboard</h1>
    <div class="stats-grid">
      <div class="stat-card glass-panel">
        <h3>System Status</h3>
        <p class="status-ok">Operational</p>
      </div>
      <div class="stat-card glass-panel">
        <h3>Environment</h3>
        <p>{{ isDev ? 'Development (SQLite)' : 'Production (Neon)' }}</p>
      </div>
    </div>

    <div class="glass-panel p-md mt-md">
      <h2>Welcome, Admin</h2>
      <p>Select a module from the sidebar to manage content.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const isDev = process.dev
</script>

<style lang="scss" scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  padding: 20px;
  h3 { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 5px; }
  p { font-size: 1.2rem; font-weight: bold; }
  .status-ok { color: #00ff00; }
}

.p-md { padding: 20px; }
.mt-md { margin-top: 20px; }
.mb-md { margin-bottom: 20px; }
</style>
