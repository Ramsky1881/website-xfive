<template>
  <div>
    <h1 class="neon-text mb-md">Manage Gallery</h1>

    <div class="glass-panel p-md mb-md">
      <h3>{{ isEditing ? 'Edit Image' : 'Add Image' }}</h3>
      <form @submit.prevent="saveItem" class="crud-form">
        <input v-model="form.title" placeholder="Title (Optional)" />
        <input v-model="form.imageUrl" placeholder="Image URL" required />
        <input v-model="form.category" placeholder="Category" />
        <div class="checkbox">
          <input type="checkbox" v-model="form.isActive" id="active" />
          <label for="active">Active</label>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-save">{{ isEditing ? 'Update' : 'Add' }}</button>
          <button v-if="isEditing" type="button" @click="cancelEdit" class="btn-cancel">Cancel</button>
        </div>
      </form>
    </div>

    <div class="list">
      <div v-for="item in gallery" :key="item.id" class="item glass-panel flex justify-between items-center p-sm mb-sm">
        <div>
          <strong>{{ item.title || 'Untitled' }}</strong>
          <small class="block text-muted">{{ item.imageUrl }}</small>
        </div>
        <div class="actions">
          <button @click="editItem(item)" class="btn-edit">Edit</button>
          <button @click="deleteItem(item.id)" class="btn-delete">Delete</button>
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

const { data: gallery, refresh } = await useFetch('/api/admin/gallery')

const isEditing = ref(false)
const editId = ref('')

const form = ref({
  title: '',
  imageUrl: '',
  category: 'general',
  isActive: true
})

async function saveItem() {
  try {
    if (isEditing.value) {
      await $fetch(`/api/admin/gallery?id=${editId.value}`, {
        method: 'PUT',
        body: form.value
      })
    } else {
      await $fetch('/api/admin/gallery', {
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

function editItem(item: any) {
  isEditing.value = true
  editId.value = item.id
  form.value = { ...item }
}

function cancelEdit() {
  isEditing.value = false
  editId.value = ''
  form.value = { title: '', imageUrl: '', category: 'general', isActive: true }
}

async function deleteItem(id: string) {
  if (!confirm('Are you sure?')) return
  try {
    await $fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' })
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
  input { padding: 8px; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); color: white; border-radius: 4px; }
  .btn-save { background: var(--neon-primary); color: #000; font-weight: bold; padding: 10px; border: none; cursor: pointer; }
}
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
