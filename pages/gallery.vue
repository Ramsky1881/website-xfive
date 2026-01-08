<template>
  <div class="page-gallery container">
    <div class="header">
      <h1 class="neon-text">Gallery</h1>
      <p class="text-muted">Moments from our community</p>
    </div>

    <div class="gallery-grid">
      <div v-for="item in gallery" :key="item.id" class="gallery-item glass-panel">
        <PlaceholderImage height="250px" :text="item.title || 'Gallery Image'" />
        <div class="overlay" v-if="item.title">
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlaceholderImage from '~/components/ui/PlaceholderImage.vue'

useSeoMeta({
  title: 'Gallery - Neraka Portal',
  description: 'View our community gallery.'
})

const { data: gallery } = await useFetch('/api/gallery')
</script>

<style lang="scss" scoped>
.page-gallery {
  padding: var(--spacing-lg) var(--spacing-sm);
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-lg);

  h1 { font-size: 3rem; margin-bottom: 0.5rem; }
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-sm);
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;

  &:hover .overlay {
    opacity: 1;
  }
}

.overlay {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  span {
    color: white;
    font-family: var(--font-display);
    font-size: 0.9rem;
  }
}
</style>
