<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-8">
      <div>
        <h2 class="text-h4 font-weight-bold">Gestión de Usuarios</h2>
        <p class="text-grey">Controla quién tiene acceso a tu infraestructura Tu-NAS</p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus" rounded="pill" @click="openAddDialog">
        Nuevo Usuario
      </v-btn>
    </div>

    <v-card class="glass-panel" rounded="xl">
      <v-table class="bg-transparent">
        <thead>
          <tr>
            <th class="text-grey">Usuario</th>
            <th class="text-grey">Rol</th>
            <th class="text-grey">Creado el</th>
            <th class="text-grey text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="font-weight-bold">
              <v-avatar color="primary" variant="tonal" size="32" class="mr-2">
                {{ user.username.charAt(0).toUpperCase() }}
              </v-avatar>
              {{ user.username }}
            </td>
            <td>
              <v-chip :color="user.role === 'admin' ? 'secondary' : 'default'" size="x-small" variant="flat">
                {{ user.role.toUpperCase() }}
              </v-chip>
            </td>
            <td class="text-grey text-caption">{{ user.created_at }}</td>
            <td class="text-right">
              <v-btn icon="mdi-pencil" variant="text" size="small" color="primary" @click="editUser(user)"></v-btn>
              <v-btn icon="mdi-delete" variant="text" size="small" color="error" @click="deleteUser(user)"></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <!-- Diálogo Añadir/Editar -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card class="glass-panel pa-6" rounded="xl">
        <v-card-title class="text-h5 font-weight-bold px-0 mb-4">
          {{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}
        </v-card-title>
        <v-form @submit.prevent="saveUser">
          <v-text-field
            v-model="form.username"
            label="Nombre de Usuario"
            variant="outlined"
            rounded="lg"
            :disabled="isEditing"
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            label="Contraseña"
            type="password"
            variant="outlined"
            rounded="lg"
            hint="Dejar en blanco para no cambiar si estás editando"
          ></v-text-field>
          <v-select
            v-model="form.role"
            :items="['admin', 'user']"
            label="Rol"
            variant="outlined"
            rounded="lg"
          ></v-select>
          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" rounded="lg" @click="dialog = false" class="mr-2">Cancelar</v-btn>
            <v-btn color="primary" rounded="lg" type="submit" :loading="loading">Guardar</v-btn>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
const users = ref([
  { id: 1, username: 'admin', role: 'admin', created_at: '2024-04-23' },
  { id: 2, username: 'marco', role: 'user', created_at: '2024-04-24' }
])

const dialog = ref(false)
const isEditing = ref(false)
const loading = ref(false)
const form = ref({ username: '', password: '', role: 'user' })

const openAddDialog = () => {
  isEditing.value = false
  form.value = { username: '', password: '', role: 'user' }
  dialog.value = true
}

const editUser = (user) => {
  isEditing.value = true
  form.value = { ...user, password: '' }
  dialog.value = true
}

const saveUser = () => {
  loading.value = true
  // Aquí irá la llamada a la API
  setTimeout(() => {
    loading.value = false
    dialog.value = false
    alert('Usuario guardado (Simulado)')
  }, 1000)
}

const deleteUser = (user) => {
  if (confirm(`¿Estás seguro de eliminar a ${user.username}?`)) {
    alert('Usuario eliminado (Simulado)')
  }
}
</script>

<style scoped>
.glass-panel {
  background: rgba(255, 255, 255, 0.02) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
}
</style>
