<template>
  <div>
    <h2 class="text-h4 font-weight-bold mb-8">Configuración del Sistema</h2>
    
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="glass-panel pa-8 mb-6" rounded="xl">
          <h3 class="text-h5 font-weight-bold mb-6">Ajustes Generales</h3>
          <v-form>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="Nombre del Clúster" variant="outlined" rounded="lg" color="primary"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Dominio Base" variant="outlined" rounded="lg" color="primary"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-switch label="Habilitar Auto-healing" color="primary"></v-switch>
                <v-switch label="Habilitar Marketplace Externo" color="primary"></v-switch>
              </v-col>
            </v-row>
            <v-btn color="primary" size="large" rounded="lg" class="mt-4">Guardar Cambios</v-btn>
          </v-form>
        </v-card>

        <v-card class="glass-panel pa-8" rounded="xl">
          <h3 class="text-h5 font-weight-bold mb-6">Seguridad</h3>
          <v-list bg-transparent>
            <v-list-item title="Cambiar Contraseña de Administrador" subtitle="Último cambio: hace 2 días">
              <template v-slot:append>
                <v-btn variant="tonal" rounded="pill">Editar</v-btn>
              </template>
            </v-list-item>
            <v-divider class="my-4" opacity="0.1"></v-divider>
            <v-list-item title="Autenticación de Dos Factores" subtitle="No habilitado">
              <template v-slot:append>
                <v-btn variant="tonal" rounded="pill" color="warning">Configurar</v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="glass-panel pa-6 text-center" rounded="xl">
          <v-avatar color="info" size="80" class="mb-4">
            <v-icon icon="mdi-update" size="40"></v-icon>
          </v-avatar>
          <h3 class="text-h6 font-weight-bold">Actualización</h3>
          <p class="text-caption text-grey mb-4">Nueva versión disponible: v1.1.0</p>
          <v-btn block color="info" rounded="lg">Actualizar Ahora</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.glass-panel {
  background: rgba(255, 255, 255, 0.02) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
}
</style>
