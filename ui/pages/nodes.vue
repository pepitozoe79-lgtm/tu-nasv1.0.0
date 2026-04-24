<template>
  <div>
    <h2 class="text-h4 font-weight-bold mb-6">Gestión de Nodos</h2>
    <v-row>
      <v-col cols="12" md="4" v-for="node in nodes" :key="node.id">
        <v-card class="glass-panel pa-6" rounded="xl">
          <div class="d-flex justify-space-between align-start mb-4">
            <v-avatar color="primary" variant="tonal" size="56">
              <v-icon icon="mdi-server" size="32"></v-icon>
            </v-avatar>
            <v-chip :color="node.status === 'online' ? 'success' : 'error'" size="small" variant="flat">
              {{ node.status.toUpperCase() }}
            </v-chip>
          </div>
          <h3 class="text-h5 font-weight-bold mb-1">{{ node.name }}</h3>
          <p class="text-caption text-grey mb-4">{{ node.host }}</p>
          
          <v-divider class="mb-4" opacity="0.1"></v-divider>
          
          <div class="d-flex justify-space-between mb-2">
            <span class="text-caption text-grey">Contenedores</span>
            <span class="text-caption font-weight-bold">{{ node.containers }}</span>
          </div>
          <v-progress-linear :model-value="node.load" color="primary" height="8" rounded></v-progress-linear>
          
          <v-card-actions class="px-0 mt-4">
            <v-btn variant="text" color="primary" block rounded="lg" border>Ver Detalles</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Botón para añadir nodo -->
      <v-col cols="12" md="4">
        <v-card
          class="glass-panel d-flex flex-column align-center justify-center pa-6"
          rounded="xl"
          variant="outlined"
          height="100%"
          min-height="250"
          style="border-style: dashed !important; border-width: 2px !important;"
        >
          <v-btn icon="mdi-plus" color="primary" size="large" variant="tonal" class="mb-4"></v-btn>
          <div class="text-h6 font-weight-bold">Añadir Nodo</div>
          <div class="text-caption text-grey">Conecta un nuevo servidor al clúster</div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const nodes = [
  { id: 1, name: 'Marco Server', host: '192.168.1.3', status: 'online', containers: 4, load: 35 },
]
</script>

<style scoped>
.glass-panel {
  background: rgba(255, 255, 255, 0.02) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
}
</style>
