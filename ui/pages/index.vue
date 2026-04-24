<template>
  <div class="dashboard">
    <!-- Header con Stats Rápidos -->
    <v-row class="mb-8">
      <v-col cols="12">
        <h2 class="text-h3 font-weight-bold mb-2">Bienvenido, Marco</h2>
        <p class="text-grey">Tu infraestructura está saludable y operando al 100%.</p>
      </v-col>
    </v-row>

    <v-row>
      <!-- Stats Cards -->
      <v-col cols="12" md="3" v-for="stat in stats" :key="stat.title">
        <v-card class="stat-card pa-4" rounded="xl">
          <div class="d-flex align-center mb-2">
            <v-avatar :color="stat.color" size="48" variant="tonal" class="mr-4">
              <v-icon :icon="stat.icon" size="24"></v-icon>
            </v-avatar>
            <div>
              <div class="text-caption text-grey">{{ stat.title }}</div>
              <div class="text-h4 font-weight-black">{{ stat.value }}</div>
            </div>
          </div>
          <v-progress-linear
            :model-value="stat.progress"
            :color="stat.color"
            rounded
            height="6"
          ></v-progress-linear>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <!-- Tabla de Aplicaciones -->
      <v-col cols="12" lg="8">
        <v-card class="glass-panel pa-6" rounded="xl">
          <div class="d-flex justify-space-between align-center mb-6">
            <h3 class="text-h5 font-weight-bold">Aplicaciones Activas</h3>
            <v-btn color="primary" prepend-icon="mdi-plus" rounded="pill">Nueva App</v-btn>
          </div>
          <v-table class="bg-transparent">
            <thead>
              <tr>
                <th class="text-grey">App</th>
                <th class="text-grey">Estado</th>
                <th class="text-grey">Nodo</th>
                <th class="text-grey">URL</th>
                <th class="text-grey">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="app in apps" :key="app.id">
                <td class="font-weight-bold">{{ app.name }}</td>
                <td>
                  <v-chip :color="app.status === 'Running' ? 'success' : 'warning'" size="small">
                    {{ app.status }}
                  </v-chip>
                </td>
                <td>{{ app.node }}</td>
                <td><a :href="'http://' + app.domain" class="text-primary text-decoration-none">{{ app.domain }}</a></td>
                <td>
                  <v-btn icon="mdi-dots-vertical" variant="text" size="small"></v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>

      <!-- Panel de Nodos -->
      <v-col cols="12" lg="4">
        <v-card class="glass-panel pa-6" rounded="xl">
          <h3 class="text-h5 font-weight-bold mb-6">Nodos del Clúster</h3>
          <div v-for="node in nodes" :key="node.id" class="node-item mb-4 pa-4 rounded-lg">
            <div class="d-flex justify-space-between align-center">
              <div class="d-flex align-center">
                <v-icon icon="mdi-server" :color="node.online ? 'success' : 'grey'" class="mr-3"></v-icon>
                <div class="font-weight-bold">{{ node.name }}</div>
              </div>
              <v-chip size="x-small" :color="node.online ? 'success' : 'grey'">
                {{ node.online ? 'Online' : 'Offline' }}
              </v-chip>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const stats = [
  { title: 'Nodos', value: '1', icon: 'mdi-server', color: 'primary', progress: 100 },
  { title: 'Apps', value: '3', icon: 'mdi-apps', color: 'success', progress: 75 },
  { title: 'CPU Usage', value: '12%', icon: 'mdi-cpu-64-bit', color: 'info', progress: 12 },
  { title: 'RAM Usage', value: '2.4GB', icon: 'mdi-memory', color: 'warning', progress: 45 },
]

const apps = [
  { id: 1, name: 'Manager API', status: 'Running', node: 'marco-node', domain: 'manager.tu-nas.local' },
  { id: 2, name: 'Proxy Nginx', status: 'Running', node: 'marco-node', domain: 'proxy.tu-nas.local' },
  { id: 3, name: 'Control Panel', status: 'Running', node: 'marco-node', domain: 'ui.tu-nas.local' },
]

const nodes = [
  { id: 1, name: 'marco-server', online: true },
  { id: 2, name: 'backup-node', online: false },
]
</script>

<style scoped>
.stat-card {
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.05) !important;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.02) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
}

.node-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
</style>
