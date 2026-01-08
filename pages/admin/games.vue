<template>
  <div>
    <h1 class="neon-text mb-md">Manage Games</h1>

    <div class="glass-panel p-md mb-md">
      <h3>{{ isEditing ? 'Edit Game' : 'Add New Game' }}</h3>
      <form @submit.prevent="saveGame" class="crud-form">
        <input v-model="form.title" placeholder="Title" required />
        <input v-model="form.slug" placeholder="Slug (url-safe)" required />
        <input v-model="form.imageUrl" placeholder="Image URL (Cloudinary string)" required />
        <textarea v-model="form.description" placeholder="Description" required></textarea>
        <input v-model="form.link" placeholder="External Link (Optional)" />
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
      <div v-for="item in games" :key="item.id" class="item glass-panel flex justify-between items-center p-sm mb-sm">
        <div>
          <strong>{{ item.title }}</strong>
          <span class="status" :class="{ active: item.isActive }">{{ item.isActive ? 'Active' : 'Inactive' }}</span>
        </div>
        <div class="actions">
          <button @click="editGame(item)" class="btn-edit">Edit</button>
          <button @click="deleteGame(item.id)" class="btn-delete">Delete</button>
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

const { data: games, refresh } = await useFetch('/api/admin/games')

const isEditing = ref(false)
const editId = ref('')

const form = ref({
  title: '',
  slug: '',
  imageUrl: '',
  description: '',
  link: '',
  isActive: true
})

async function saveGame() {
  try {
    if (isEditing.value) {
      await $fetch(`/api/admin/games?id=${editId.value}`, {
        method: 'PUT',
        body: form.value
      })
    } else {
      await $fetch('/api/admin/games', {
        method: 'POST',
        body: form.value
      })
    }
    cancelEdit()
    refresh()
  } catch (e) {
    alert('Failed to save')
  }
}

function editGame(item: any) {
  isEditing.value = true
  editId.value = item.id
  form.value = { ...item }
}

function cancelEdit() {
  isEditing.value = false
  editId.value = ''
  form.value = { title: '', slug: '', imageUrl: '', description: '', link: '', isActive: true }
}

async function deleteGame(id: string) {
  if (!confirm('Are you sure?')) return
  try {
    await $fetch(`/api/admin/games?id=${id}`, { method: 'DELETE' })
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

  input, textarea {
    padding: 8px;
    background: rgba(0,0,0,0.3);
    border: 1px solid var(--glass-border);
    color: white;
    border-radius: 4px;
  }

  .btn-save {
    background: var(--neon-primary);
    color: #000;
    font-weight: bold;
    padding: 10px;
    border: none;
    cursor: pointer;
  }
}

.item { border: 1px solid var(--glass-border); }
.status { font-size: 0.8rem; margin-left: 10px; color: #ff4d4d; &.active { color: #00ff00; } }
.btn-delete { background: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; }
.btn-edit { background: var(--neon-secondary); color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-right: 5px; }
.btn-cancel { background: var(--text-muted); color: #000; font-weight: bold; padding: 10px; border: none; cursor: pointer; }
.form-actions { display: flex; gap: 10px; }
.mb-md { margin-bottom: 20px; }
.p-md { padding: 20px; }
.mb-sm { margin-bottom: 10px; }
.p-sm { padding: 10px; }
</style>
