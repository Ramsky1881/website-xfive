<template>
  <div class="page-game container" v-if="game">
    <div class="game-header">
      <h1 class="neon-text">{{ game.title }}</h1>
    </div>
    <div class="game-content glass-panel p-sm">
      <PlaceholderImage height="400px" :text="game.title" class="mb-md" />
      <div class="description">
        <p>{{ game.description }}</p>
      </div>
      <div v-if="game.link" class="mt-md text-center">
        <a :href="game.link" target="_blank" class="btn-external">Play Now / Website</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlaceholderImage from '~/components/ui/PlaceholderImage.vue'

const route = useRoute()
const { data: games } = await useFetch('/api/games')
const game = computed(() => games.value?.find(g => g.slug === route.params.slug))

useSeoMeta({
  title: () => `${game.value?.title} - Neraka Portal`
})
</script>

<style lang="scss" scoped>
.page-game {
  padding: var(--spacing-lg) var(--spacing-sm);
}
.game-header { margin-bottom: var(--spacing-md); text-align: center; }
.mb-md { margin-bottom: var(--spacing-md); }
.description { font-size: 1.1rem; line-height: 1.6; }

.btn-external {
  display: inline-block;
  background: var(--neon-purple);
  color: white;
  padding: 10px 30px;
  border-radius: 4px;
  &:hover { background: var(--neon-secondary); }
}
</style>
