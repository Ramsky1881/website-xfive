<template>
  <div class="page-tournaments container">
    <div class="header">
      <h1 class="neon-text">Tournaments</h1>
      <p class="text-muted">Compete and Win</p>
    </div>

    <div class="tournament-list">
      <div v-for="t in tournaments" :key="t.slug" class="tournament-card glass-panel">
        <div class="t-image">
          <PlaceholderImage height="100%" width="200px" :text="t.title" />
        </div>
        <div class="t-info">
          <h2>{{ t.title }}</h2>
          <div class="meta flex gap-sm">
            <span>📅 {{ new Date(t.startDate).toLocaleDateString() }}</span>
            <span>📍 {{ t.location || 'Online' }}</span>
            <span class="prize">🏆 {{ t.prizePool || 'TBA' }}</span>
          </div>
          <p>{{ t.description }}</p>
        </div>
        <div class="t-action">
          <NuxtLink :to="`/tournaments/${t.slug}`" class="btn-join">Details</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlaceholderImage from '~/components/ui/PlaceholderImage.vue'

useSeoMeta({
  title: 'Tournaments - Neraka Portal',
  description: 'Join upcoming tournaments and compete for prizes.'
})

const { data: tournaments } = await useFetch('/api/tournaments')
</script>

<style lang="scss" scoped>
.page-tournaments {
  padding: var(--spacing-lg) var(--spacing-sm);
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
  h1 { font-size: 3rem; margin-bottom: 0.5rem; }
}

.tournament-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.tournament-card {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-sm);
  transition: border-color 0.3s ease;

  &:hover {
    border-color: var(--neon-primary);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    .t-image { width: 100%; height: 200px; }
  }
}

.t-image {
  flex-shrink: 0;
}

.t-info {
  flex-grow: 1;
  h2 { color: var(--neon-primary); margin-bottom: 0.5rem; }
  .meta {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 1rem;
    .prize { color: var(--neon-secondary); font-weight: bold; }
  }
  p { line-height: 1.6; }
}

.t-action {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
}

.btn-join {
  background: var(--neon-purple);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 700;
  &:hover {
    background: var(--neon-secondary);
    box-shadow: 0 0 10px var(--neon-secondary);
  }
}
</style>
