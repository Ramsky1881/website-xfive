export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    await $fetch('/api/admin/me')
  } catch (e) {
    return navigateTo('/admin/login')
  }
})
