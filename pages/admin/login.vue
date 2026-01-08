<template>
  <div class="login-page flex items-center justify-center">
    <div class="login-card glass-panel p-md">
      <h1 class="text-center neon-text mb-md">Admin Access</h1>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <div class="input-wrapper">
            <Mail :size="18" class="icon" />
            <input v-model="email" type="email" required placeholder="admin@neraka.portal" />
          </div>
        </div>

        <div class="form-group">
          <label>Password</label>
          <div class="input-wrapper">
            <Lock :size="18" class="icon" />
            <input v-model="password" type="password" required placeholder="••••••••" />
          </div>
        </div>

        <div v-if="error" class="error-msg">
          {{ error }}
        </div>

        <button type="submit" class="btn-login" :disabled="loading">
          {{ loading ? 'Authenticating...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Mail, Lock } from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

async function handleLogin() {
  loading.value = true
  error.value = ''

  try {
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    router.push('/admin')
  } catch (e: any) {
    error.value = e.data?.statusMessage || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: radial-gradient(circle at center, #2d1b4e 0%, #000 100%);
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: var(--spacing-md);
}

.mb-md { margin-bottom: var(--spacing-md); }

.form-group {
  margin-bottom: var(--spacing-sm);

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 0.9rem;
    color: var(--text-muted);
  }
}

.input-wrapper {
  position: relative;

  .icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
  }

  input {
    width: 100%;
    padding: 10px 10px 10px 35px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--glass-border);
    color: white;
    border-radius: 4px;
    font-family: var(--font-main);

    &:focus {
      outline: none;
      border-color: var(--neon-primary);
    }
  }
}

.error-msg {
  color: #ff4d4d;
  font-size: 0.9rem;
  margin-bottom: var(--spacing-sm);
  text-align: center;
}

.btn-login {
  width: 100%;
  padding: 12px;
  background: var(--neon-purple);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;

  &:hover:not(:disabled) {
    background: var(--neon-secondary);
  }

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }
}
</style>
