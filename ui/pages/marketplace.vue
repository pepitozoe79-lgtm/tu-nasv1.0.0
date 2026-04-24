<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-8">
      <h2 class="text-h4 font-weight-bold">App Marketplace</h2>
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        label="Buscar aplicaciones..."
        variant="solo"
        rounded="pill"
        hide-details
        max-width="400"
        class="search-bar"
      ></v-text-field>
    </div>

    <v-row>
      <v-col cols="12" sm="6" lg="3" v-for="app in catalog" :key="app.name">
        <v-card class="app-card" rounded="xl">
          <v-img :src="app.image" height="150" cover class="align-end">
            <div class="pa-4 glass-overlay">
              <v-avatar size="48" rounded="lg" color="white" class="pa-2">
                <v-img :src="app.icon"></v-img>
              </v-avatar>
            </div>
          </v-img>
          <v-card-text class="pa-6">
            <div class="d-flex justify-space-between align-center mb-2">
              <h3 class="text-h6 font-weight-bold">{{ app.name }}</h3>
              <v-chip size="x-small" color="primary">{{ app.category }}</v-chip>
            </div>
            <p class="text-caption text-grey mb-6">{{ app.description }}</p>
            <v-btn 
              block 
              color="primary" 
              rounded="lg" 
              prepend-icon="mdi-download"
              :loading="app.loading"
              @click="handleInstall(app)"
            >
              Instalar
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const catalog = ref([
  {
    slug: 'jellyfin',
    name: 'Jellyfin',
    category: 'Media',
    description: 'El servidor de medios libre y de código abierto.',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=500&q=80',
    icon: 'https://jellyfin.org/images/logo.svg',
    loading: false
  },
  {
    slug: 'nextcloud',
    name: 'Nextcloud',
    category: 'Cloud',
    description: 'Tu plataforma de colaboración y almacenamiento de archivos.',
    image: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=500&q=80',
    icon: 'https://nextcloud.com/media/logo-nextcloud.svg',
    loading: false
  },
  {
    slug: 'homeassistant',
    name: 'Home Assistant',
    category: 'IoT',
    description: 'Controla tu hogar de forma privada y local.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&q=80',
    icon: 'https://www.home-assistant.io/images/home-assistant-logo.svg',
    loading: false
  },
  {
    slug: 'adguard',
    name: 'AdGuard Home',
    category: 'Network',
    description: 'Bloqueador de anuncios y rastreadores en toda la red.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80',
    icon: 'https://adguard.com/img/logo.svg',
    loading: false
  }
])

const handleInstall = async (app) => {
  app.loading = true
  try {
    const response = await fetch('/api/marketplace/install', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: app.slug })
    })
    const data = await response.json()
    if (data.ok) {
      alert(`${app.name} se está instalando. En unos segundos estará disponible en ${app.slug}.tu-nas.local`)
    } else {
      throw new Error(data.error)
    }
  } catch (e) {
    alert('Error al instalar: ' + e.message)
  } finally {
    app.loading = false
  }
}
</script>

<style scoped>
.app-card {
  background: rgba(255, 255, 255, 0.02) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  transition: all 0.3s ease;
}

.app-card:hover {
  transform: translateY(-8px);
  border-color: rgba(108, 92, 231, 0.3) !important;
}

.glass-overlay {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  width: 100%;
}
</style>
