// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false }, // User requested anti-devtools / security focus
  app: {
    head: {
      htmlAttrs: { lang: 'id-ID' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Orbitron:wght@400;700;900&display=swap' }
      ]
    }
  },
  experimental: {
    renderJsonPayloads: false
  },
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],
  site: {
    url: 'https://neraka-portal.netlify.app',
    name: 'Neraka Portal'
  },
  sitemap: {
    sources: [
      '/api/sitemap' // Dynamic routes source
    ]
  }
})
