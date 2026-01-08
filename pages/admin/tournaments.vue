<template>
  <div>
    <h1 class="neon-text mb-md">Manage Tournaments</h1>

    <div class="glass-panel p-md mb-md">
      <h3>{{ isEditing ? 'Edit Tournament' : 'Add New Tournament' }}</h3>
      <form @submit.prevent="saveTournament" class="crud-form">
        <input v-model="form.title" placeholder="Title" required />
        <input v-model="form.slug" placeholder="Slug (url-safe)" required />
        <input v-model="form.imageUrl" placeholder="Image URL" required />
        <textarea v-model="form.description" placeholder="Description" required></textarea>
        <div class="grid-2">
          <input type="datetime-local" v-model="form.startDate" required />
          <input type="datetime-local" v-model="form.endDate" required />
        </div>
        <input v-model="form.location" placeholder="Location (e.g. Online)" />
        <input v-model="form.prizePool" placeholder="Prize Pool" />
        <div class="checkbox">
          <input type="checkbox" v-model="form.isActive" id="active" />
          <label for="active">Active</label>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-save">{{ isEditing ? 'Update' : 'Create' }}</button>
          <button v-if="isEditing" type="button" @click="cancelEdit" class="btn-cancel">Cancel</button>
        </div>
      </form>
    </div>

    <div class="list">
      <div v-for="item in tournaments" :key="item.id" class="item glass-panel flex justify-between items-center p-sm mb-sm">
        <div>
          <strong>{{ item.title }}</strong>
          <small class="block text-muted">{{ new Date(item.startDate).toLocaleDateString() }}</small>
        </div>
        <div class="actions">
          <button @click="editTournament(item)" class="btn-edit">Edit</button>
          <button @click="deleteTournament(item.id)" class="btn-delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { data: tournaments, refresh } = await useFetch('/api/admin/tournaments')

const isEditing = ref(false)
const editId = ref('')

const form = ref({
  title: '',
  slug: '',
  imageUrl: '',
  description: '',
  startDate: '',
  endDate: '',
  location: '',
  prizePool: '',
  isActive: true
})

async function saveTournament() {
  try {
    // Need to ensure ISO strings
    const payload = { ...form.value }
    // HTML datetime-local input gives 'YYYY-MM-DDTHH:MM', which is usually ISO compatible enough for constructor

    if (isEditing.value) {
      await $fetch(`/api/admin/tournaments?id=${editId.value}`, {
        method: 'PUT',
        body: payload
      })
    } else {
      await $fetch('/api/admin/tournaments', {
        method: 'POST',
        body: payload
      })
    }
    cancelEdit()
    refresh()
  } catch (e) {
    alert('Failed to save')
  }
}

function editTournament(item: any) {
  isEditing.value = true
  editId.value = item.id
  // Format dates for datetime-local (YYYY-MM-DDTHH:MM)
  const format = (d: string) => d ? new Date(d).toISOString().slice(0, 16) : ''
  form.value = {
    ...item,
    startDate: format(item.startDate),
    endDate: format(item.endDate)
  }
}

function cancelEdit() {
  isEditing.value = false
  editId.value = ''
  form.value = { title: '', slug: '', imageUrl: '', description: '', startDate: '', endDate: '', location: '', prizePool: '', isActive: true }
}

async function deleteTournament(id: string) {
  if (!confirm('Are you sure?')) return
  try {
    await $fetch(`/api/admin/tournaments?id=${id}`, { method: 'DELETE' })
    refresh()
  } catch (e) {
    alert('Failed to delete')
  }
}
</script>

<style lang="scss" scoped>
.crud-form {
  display: grid;
  gap: 10px;
  max-width: 500px;
  input, textarea { padding: 8px; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); color: white; border-radius: 4px; }
  .btn-save { background: var(--neon-primary); color: #000; font-weight: bold; padding: 10px; border: none; cursor: pointer; }
}
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.item { border: 1px solid var(--glass-border); }
.block { display: block; }
.text-muted { color: var(--text-muted); }
.btn-delete { background: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; }
.btn-edit { background: var(--neon-secondary); color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-right: 5px; }
.btn-cancel { background: var(--text-muted); color: #000; font-weight: bold; padding: 10px; border: none; cursor: pointer; }
.form-actions { display: flex; gap: 10px; }
.mb-md { margin-bottom: 20px; }
.p-md { padding: 20px; }
.mb-sm { margin-bottom: 10px; }
.p-sm { padding: 10px; }
</style>
