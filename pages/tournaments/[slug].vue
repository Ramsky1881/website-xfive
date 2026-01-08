<template>
  <div class="page-tournament container" v-if="tournament">
    <div class="header">
      <h1 class="neon-text">{{ tournament.title }}</h1>
      <p class="prize-pool">Prize Pool: {{ tournament.prizePool || 'TBA' }}</p>
    </div>

    <div class="content glass-panel p-sm">
      <div class="meta-grid">
         <div class="meta-item">
           <span class="label">Start Date</span>
           <span class="value">{{ new Date(tournament.startDate).toLocaleDateString() }}</span>
         </div>
         <div class="meta-item">
           <span class="label">Location</span>
           <span class="value">{{ tournament.location || 'Online' }}</span>
         </div>
      </div>

      <PlaceholderImage height="300px" :text="tournament.title" class="my-md" />

      <div class="description">
        <h3>About Tournament</h3>
        <p>{{ tournament.description }}</p>
      </div>

      <div class="actions text-center mt-lg">
        <button class="btn-register" disabled>Registration Closed (Demo)</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlaceholderImage from '~/components/ui/PlaceholderImage.vue'

const route = useRoute()
const { data: tournaments } = await useFetch('/api/tournaments')
const tournament = computed(() => tournaments.value?.find(t => t.slug === route.params.slug))

useSeoMeta({
  title: () => `${tournament.value?.title} - Neraka Portal`
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => {
        if (!tournament.value) return {}
        return JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: tournament.value.title,
          startDate: tournament.value.startDate,
          endDate: tournament.value.endDate,
          eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          location: {
            '@type': 'VirtualLocation',
            url: 'https://neraka-portal.netlify.app' // or specific game link
          },
          image: [tournament.value.imageUrl],
          description: tournament.value.description,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            validFrom: new Date().toISOString()
          },
          organizer: {
            '@type': 'Organization',
            name: 'Neraka Portal',
            url: 'https://neraka-portal.netlify.app'
          }
        })
      })
    }
  ]
})
</script>

<style lang="scss" scoped>
.page-tournament {
  padding: var(--spacing-lg) var(--spacing-sm);
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-md);

  .prize-pool {
    font-size: 1.5rem;
    color: var(--neon-secondary);
    font-weight: bold;
    margin-top: 0.5rem;
  }
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);

  .meta-item {
    background: rgba(255, 255, 255, 0.05);
    padding: 10px;
    border-radius: 4px;
    text-align: center;

    .label { display: block; font-size: 0.8rem; color: var(--text-muted); }
    .value { font-weight: bold; color: var(--neon-primary); }
  }
}

.my-md { margin: var(--spacing-md) 0; }
.mt-lg { margin-top: var(--spacing-lg); }

.btn-register {
  background: var(--text-muted);
  color: #000;
  padding: 15px 40px;
  font-weight: bold;
  border: none;
  cursor: not-allowed;
  border-radius: 4px;
}
</style>
