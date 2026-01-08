<template>
  <div class="page-home">
    <!-- Hero -->
    <section class="hero relative flex items-center justify-center">
      <div class="hero-bg"></div>
      <div class="container relative z-10 text-center">
        <h1 class="hero-title neon-text">WELCOME TO <br>NERAKA PORTAL</h1>
        <p class="hero-subtitle">The Ultimate Gaming Community</p>
        <div class="flex justify-center gap-sm mt-md">
          <NuxtLink to="/tournaments" class="btn-hero primary">
            <Trophy :size="20" /> Join Tournament
          </NuxtLink>
          <NuxtLink to="/gallery" class="btn-hero secondary">
            <Image :size="20" /> View Gallery
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Preview -->
    <section class="section">
      <div class="container">
        <h2 class="section-title"><Zap :size="24" class="icon" /> Featured Content</h2>
        <div class="grid">
          <div v-for="f in features" :key="f.slug" class="card glass-panel">
            <PlaceholderImage height="180px" :text="f.title" />
            <div class="card-body">
              <h3>{{ f.title }}</h3>
              <p>{{ f.description }}</p>
              <NuxtLink :to="`/features/${f.slug}`" class="read-more">Read More &rarr;</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Games Preview -->
    <section class="section">
      <div class="container">
        <h2 class="section-title"><Gamepad2 :size="24" class="icon" /> Popular Games</h2>
        <div class="grid">
          <div v-for="g in games" :key="g.slug" class="card glass-panel">
            <PlaceholderImage height="180px" :text="g.title" />
            <div class="card-body">
              <h3>{{ g.title }}</h3>
              <p>{{ g.description }}</p>
              <NuxtLink :to="`/games/${g.slug}`" class="read-more">View Game &rarr;</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Trophy, Image, Zap, Gamepad2 } from 'lucide-vue-next'
import PlaceholderImage from '~/components/ui/PlaceholderImage.vue'

useSeoMeta({
  title: 'Home - Neraka Portal',
  description: 'Join the ultimate gaming community. Tournaments, news, and more.'
})

const { data: features } = await useFetch('/api/features')
const { data: games } = await useFetch('/api/games')
</script>

<style lang="scss" scoped>
.hero {
  height: 80vh;
  overflow: hidden;

  .hero-bg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at center, #1a0b2e 0%, #000 100%);
    opacity: 0.8;
  }
}

.hero-title {
  font-size: 4rem;
  margin-bottom: 1rem;
  line-height: 1.1;
  background: linear-gradient(to right, var(--neon-primary), var(--neon-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--text-main);
  opacity: 0.8;
}

.btn-hero {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 30px;
  font-family: var(--font-display);
  font-weight: 700;
  border-radius: 4px;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &.primary {
    background: var(--neon-purple);
    color: white;
    &:hover { box-shadow: 0 0 20px var(--neon-purple); }
  }

  &.secondary {
    background: transparent;
    border: 1px solid var(--neon-primary);
    color: var(--neon-primary);
    &:hover { background: rgba(0, 255, 255, 0.1); box-shadow: 0 0 10px var(--neon-primary); }
  }
}

.section {
  padding: var(--spacing-lg) 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--glass-border);
  padding-bottom: 10px;
  margin-bottom: var(--spacing-md);

  .icon { color: var(--neon-primary); }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.card {
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--neon-primary);
  }

  .card-body {
    padding: var(--spacing-sm);

    h3 { color: var(--neon-primary); margin-bottom: 0.5rem; }
    p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1rem; }

    .read-more {
      color: white;
      font-size: 0.8rem;
      font-weight: 600;
      &:hover { color: var(--neon-secondary); }
    }
  }
}
</style>
