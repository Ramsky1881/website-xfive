<template>
  <div class="page-feature container" v-if="feature">
    <div class="feature-header">
      <h1 class="neon-text">{{ feature.title }}</h1>
    </div>
    <div class="feature-content glass-panel p-sm">
      <PlaceholderImage height="400px" :text="feature.title" class="mb-md" />
      <div class="description">
        <p>{{ feature.description }}</p>
      </div>
      <div v-if="feature.link" class="mt-md text-center">
        <a :href="feature.link" target="_blank" class="btn-external">Visit Link</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlaceholderImage from '~/components/ui/PlaceholderImage.vue'

const route = useRoute()
const { data: features } = await useFetch('/api/features')
// In a real app we'd fetch by slug from API, but for simplicity reusing list or finding
const feature = computed(() => features.value?.find(f => f.slug === route.params.slug))

if (!feature.value) {
  // If we were fetching single item: throw createError({ statusCode: 404, statusMessage: 'Feature not found' })
}

useSeoMeta({
  title: () => `${feature.value?.title} - Neraka Portal`
})
</script>

<style lang="scss" scoped>
.page-feature {
  padding: var(--spacing-lg) var(--spacing-sm);
}
.feature-header { margin-bottom: var(--spacing-md); text-align: center; }
.mb-md { margin-bottom: var(--spacing-md); }
.description { font-size: 1.1rem; line-height: 1.6; }

.btn-external {
  display: inline-block;
  border: 1px solid var(--neon-primary);
  color: var(--neon-primary);
  padding: 10px 20px;
  border-radius: 4px;
  &:hover { background: rgba(0, 255, 255, 0.1); }
}
</style>
