<template>
  <div class="admin-layout">
    <aside class="sidebar glass-panel">
      <div class="brand neon-text">ADMIN</div>
      <nav>
        <NuxtLink to="/admin" class="nav-link">
          <LayoutDashboard :size="18" /> Dashboard
        </NuxtLink>
        <NuxtLink to="/admin/features" class="nav-link">
          <Zap :size="18" /> Features
        </NuxtLink>
        <NuxtLink to="/admin/games" class="nav-link">
          <Gamepad2 :size="18" /> Games
        </NuxtLink>
        <NuxtLink to="/admin/tournaments" class="nav-link">
          <Trophy :size="18" /> Tournaments
        </NuxtLink>
        <NuxtLink to="/admin/gallery" class="nav-link">
          <Image :size="18" /> Gallery
        </NuxtLink>
      </nav>
      <div class="footer">
        <button @click="logout" class="btn-logout">
          <LogOut :size="18" /> Logout
        </button>
      </div>
    </aside>

    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { LayoutDashboard, Zap, Gamepad2, Trophy, Image, LogOut } from 'lucide-vue-next'

const router = useRouter()

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  router.push('/admin/login')
}
</script>

<style lang="scss" scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-radius: 0;
  border-left: none;
  border-top: none;
  border-bottom: none;
  z-index: 10;
}

.brand {
  padding: 20px;
  font-size: 1.5rem;
  text-align: center;
  border-bottom: 1px solid var(--glass-border);
}

nav {
  padding: 20px 0;
  flex-grow: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  color: var(--text-muted);
  transition: all 0.3s;

  &:hover, &.router-link-active {
    background: rgba(255, 255, 255, 0.05);
    color: var(--neon-primary);
    border-right: 2px solid var(--neon-primary);
  }
}

.footer {
  padding: 20px;
  border-top: 1px solid var(--glass-border);
}

.btn-logout {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: none;
  border: 1px solid var(--text-muted);
  color: var(--text-muted);
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    border-color: #ff4d4d;
    color: #ff4d4d;
  }
}

.content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
