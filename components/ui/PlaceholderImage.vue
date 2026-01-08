<template>
  <div class="placeholder-img" :style="{ width, height }">
    <div class="content">
      <span class="text">{{ text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '200px' },
  text: { type: String, default: 'Image Placeholder' }
})
</script>

<style lang="scss" scoped>
.placeholder-img {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
  }
}

.content {
  z-index: 1;
  color: var(--text-muted);
  font-family: var(--font-display);
  font-size: 0.8rem;
  letter-spacing: 1px;
  text-transform: uppercase;
}
</style>
