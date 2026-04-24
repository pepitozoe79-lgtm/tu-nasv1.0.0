<template>
  <v-app class="login-page">
    <v-container fluid class="fill-height d-flex align-center justify-center">
      <div class="bg-glow blob-login"></div>
      
      <v-card width="450" class="login-card pa-8" rounded="xl" elevation="24">
        <div class="text-center mb-8">
          <h1 class="text-h3 font-weight-black gradient-text mb-2">TU-NAS</h1>
          <p class="text-grey">Panel de Control de Infraestructura</p>
        </div>

        <v-form @submit.prevent="handleLogin">
          <v-text-field
            label="Usuario"
            variant="outlined"
            prepend-inner-icon="mdi-account"
            class="mb-4"
            rounded="lg"
            color="primary"
          ></v-text-field>

          <v-text-field
            label="Contraseña"
            type="password"
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            class="mb-6"
            rounded="lg"
            color="primary"
          ></v-text-field>

          <v-btn
            block
            size="large"
            color="primary"
            class="login-btn mb-4"
            rounded="lg"
            type="submit"
          >
            Iniciar Sesión
          </v-btn>

          <div class="text-center">
            <v-btn variant="text" size="small" color="grey" class="text-none">
              ¿Olvidaste tu contraseña?
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup>
definePageMeta({
  layout: false
})

const handleLogin = () => {
  // Por ahora redirigimos al dashboard
  navigateTo('/')
}
</script>

<style scoped>
.login-page {
  background: #0a0f1e !important;
  overflow: hidden;
}

.login-card {
  background: rgba(17, 25, 40, 0.8) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  z-index: 1;
}

.login-btn {
  background: linear-gradient(45deg, #6c5ce7, #00d2ff) !important;
  font-weight: bold;
  text-transform: none;
}

.blob-login {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(108, 92, 231, 0.2) 0%, transparent 70%);
  filter: blur(50px);
}
</style>
