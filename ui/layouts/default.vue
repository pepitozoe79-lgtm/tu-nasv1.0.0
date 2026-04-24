<template>
  <v-app class="tu-nas-app">
    <!-- Barra Lateral Premium -->
    <v-navigation-drawer
      v-model="drawer"
      permanent
      class="sidebar-glass"
      elevation="0"
    >
      <div class="logo-container py-8 px-6">
        <h1 class="text-h4 font-weight-black gradient-text">TU-NAS</h1>
        <p class="text-caption text-grey-lighten-1">Orquestador Cloud v1.0.0</p>
      </div>

      <v-list nav class="px-4">
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          to="/"
          rounded="lg"
          active-color="primary"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-server-network"
          title="Nodos"
          to="/nodes"
          rounded="lg"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-apps"
          title="Marketplace"
          to="/marketplace"
          rounded="lg"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-cog"
          title="Ajustes"
          to="/setup"
          rounded="lg"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-4">
          <v-btn
            block
            color="error"
            variant="tonal"
            prepend-icon="mdi-logout"
            rounded="lg"
            @click="handleLogout"
          >
            Salir
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Contenido Principal -->
    <v-main class="main-bg">
      <v-container fluid class="pa-8">
        <slot />
      </v-container>
    </v-main>

    <!-- Decoración de fondo -->
    <div class="bg-glow blob-1"></div>
    <div class="bg-glow blob-2"></div>
  </v-app>
</template>

<script setup>
const drawer = ref(true)

const handleLogout = () => {
  // Redirigir al login
  navigateTo('/login')
}
</script>

<style>
.tu-nas-app {
  background: #0a0f1e !important;
}

.main-bg {
  background: transparent !important;
}

.sidebar-glass {
  background: rgba(17, 25, 40, 0.75) !important;
  backdrop-filter: blur(16px);
  border-right: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.gradient-text {
  background: linear-gradient(45deg, #6c5ce7, #00d2ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bg-glow {
  position: fixed;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.15;
  pointer-events: none;
}

.blob-1 {
  background: #6c5ce7;
  top: -100px;
  right: -100px;
}

.blob-2 {
  background: #00d2ff;
  bottom: -100px;
  left: -100px;
}

.v-list-item--active {
  background: linear-gradient(90deg, rgba(108, 92, 231, 0.2) 0%, transparent 100%) !important;
  border-left: 3px solid #6c5ce7;
}
</style>
