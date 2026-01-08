<template>
  <div class="layout-container">
    <Navbar />
    <main class="flex-grow">
      <slot />
    </main>
    <footer class="glass-panel mt-md p-sm">
      <div class="container text-center">
        <p class="text-muted">&copy; {{ new Date().getFullYear() }} Neraka Portal. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import '~/assets/scss/main.scss'

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Neraka Portal',
        url: 'https://neraka-portal.netlify.app',
        logo: 'https://neraka-portal.netlify.app/logo.png',
        sameAs: [
          'https://facebook.com/nerakaportal',
          'https://twitter.com/nerakaportal'
        ]
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Neraka Portal',
        url: 'https://neraka-portal.netlify.app',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://neraka-portal.netlify.app/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    }
  ]
})
</script>

<style scoped>
.flex-grow { flex-grow: 1; }
.text-muted { color: var(--text-muted); font-size: 0.8rem; }
</style>
