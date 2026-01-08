export default defineEventHandler(async (event) => {
  // If middleware passed, user is in context
  return {
    user: event.context.user
  }
})
