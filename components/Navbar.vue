<template>
  <nav class="navbar glass-panel">
    <div class="container flex justify-between items-center h-full">
      <div class="logo">
        <NuxtLink to="/">
          <span class="neon-text">NERAKA</span> PORTAL
        </NuxtLink>
      </div>

      <div class="desktop-menu flex items-center gap-sm">
        <NuxtLink to="/" class="nav-item">
          <Home :size="18" class="icon" /> Home
        </NuxtLink>

        <NuxtLink to="/gallery" class="nav-item">
          <Image :size="18" class="icon" /> Gallery
        </NuxtLink>

        <a href="https://xfivephoto.com" target="_blank" rel="noopener noreferrer" class="nav-item">
          <Camera :size="18" class="icon" /> Photo Member
          <ExternalLink :size="12" class="external-icon" />
        </a>

        <!-- Features Dropdown -->
        <div class="dropdown" @mouseenter="showFeatures = true" @mouseleave="showFeatures = false">
          <button class="nav-item">
            <Zap :size="18" class="icon" /> Features
            <ChevronDown :size="14" />
          </button>
          <div v-if="showFeatures" class="dropdown-content glass-panel">
            <NuxtLink v-for="f in features" :key="f.slug" :to="`/features/${f.slug}`" class="dropdown-item">
              {{ f.title }}
            </NuxtLink>
            <div v-if="features.length === 0" class="dropdown-empty">No features</div>
          </div>
        </div>

        <!-- Games Dropdown -->
        <div class="dropdown" @mouseenter="showGames = true" @mouseleave="showGames = false">
          <button class="nav-item">
            <Gamepad2 :size="18" class="icon" /> Games
            <ChevronDown :size="14" />
          </button>
          <div v-if="showGames" class="dropdown-content glass-panel">
            <NuxtLink v-for="g in games" :key="g.slug" :to="`/games/${g.slug}`" class="dropdown-item">
              {{ g.title }}
            </NuxtLink>
            <div v-if="games.length === 0" class="dropdown-empty">No games</div>
          </div>
        </div>

        <NuxtLink to="/tournaments" class="nav-item">
          <Trophy :size="18" class="icon" /> Tournaments
        </NuxtLink>

        <NuxtLink to="/admin/login" class="btn-primary">
          <Lock :size="16" /> Login Admin
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Home, Image, Camera, ExternalLink, Zap, ChevronDown, Gamepad2, Trophy, Lock } from 'lucide-vue-next'

const showFeatures = ref(false)
const showGames = ref(false)

const { data: features } = await useFetch('/api/features', { default: () => [] })
const { data: games } = await useFetch('/api/games', { default: () => [] })
</script>

<style lang="scss" scoped>
.navbar {
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--glass-border);
}

.h-full { height: 100%; }

.logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 900;
  a { text-decoration: none; color: white; }
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  color: var(--text-main);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  background: none;
  border: none;
  font-family: var(--font-main);
  transition: color 0.3s ease;

  &:hover {
    color: var(--neon-primary);
    .icon {
      transform: scale(1.1);
    }
  }

  .icon {
    transition: transform 0.2s ease;
  }
}

.external-icon {
  margin-left: 2px;
  opacity: 0.7;
}

.dropdown {
  position: relative;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  padding: 10px 0;
  flex-direction: column;
  display: flex;
}

.dropdown-item {
  padding: 10px 20px;
  color: var(--text-main);
  font-size: 0.9rem;
  display: block;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--neon-primary);
  }
}

.dropdown-empty {
  padding: 10px 20px;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--neon-purple);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  margin-left: 10px;

  &:hover {
    background: var(--neon-secondary);
    box-shadow: 0 0 10px var(--neon-secondary);
    color: white;
  }
}
</style>
