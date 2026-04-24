<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-8">
      <div>
        <h2 class="text-h4 font-weight-bold">App Marketplace</h2>
        <p class="text-grey">Explora e instala aplicaciones del ecosistema Tu-NAS</p>
      </div>
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Buscar aplicaciones..."
        variant="solo"
        rounded="pill"
        hide-details
        max-width="400"
        class="search-bar"
      ></v-text-field>
    </div>

    <!-- Categorías -->
    <v-tabs v-model="activeTab" class="mb-8" color="primary">
      <v-tab value="all">Todas</v-tab>
      <v-tab value="Media">Media</v-tab>
      <v-tab value="Cloud">Cloud</v-tab>
      <v-tab value="Network">Red</v-tab>
      <v-tab value="Tools">Herramientas</v-tab>
    </v-tabs>

    <!-- Lista de Aplicaciones (Se filtran reactivamente) -->
    <v-row>
      <v-col cols="12" sm="6" lg="3" v-for="app in filteredCatalog" :key="app.slug">
        <v-card class="app-card" rounded="xl">
          <v-img :src="app.image" height="140" cover class="align-end">
            <div class="pa-4 glass-overlay d-flex align-center">
              <v-avatar size="40" rounded="lg" color="white" class="pa-1 mr-3 shadow-sm">
                <v-img :src="app.icon"></v-img>
              </v-avatar>
              <div class="text-white font-weight-bold shadow-text">{{ app.name }}</div>
            </div>
          </v-img>
          <v-card-text class="pa-5">
            <div class="d-flex justify-space-between align-center mb-2">
              <v-chip size="x-small" color="primary" variant="tonal">{{ app.category }}</v-chip>
              <span class="text-caption text-grey">v1.0</span>
            </div>
            <p class="text-caption text-grey-lighten-1 mb-6 text-truncate-2">{{ app.description }}</p>
            <v-btn 
              block 
              color="primary" 
              rounded="lg" 
              prepend-icon="mdi-download"
              :loading="app.loading"
              @click="handleInstall(app)"
              class="install-btn"
            >
              Instalar
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Estado vacío -->
    <div v-if="filteredCatalog.length === 0" class="text-center py-12">
      <v-icon icon="mdi-magnify" size="64" color="grey-darken-2" class="mb-4"></v-icon>
      <div class="text-h6 text-grey">No se encontraron aplicaciones en esta categoría</div>
    </div>
  </div>
</template>

<script setup>
const search = ref('')
const activeTab = ref('all')

const catalog = ref([
  // Media
  { slug: 'jellyfin', name: 'Jellyfin', category: 'Media', description: 'Servidor de medios libre.', image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=500&q=80', icon: 'https://jellyfin.org/images/logo.svg', loading: false },
  { slug: 'plex', name: 'Plex', category: 'Media', description: 'Organiza y transmite tus medios.', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&q=80', icon: 'https://www.vectorlogo.zone/logos/plex/plex-icon.svg', loading: false },
  { slug: 'emby', name: 'Emby', category: 'Media', description: 'Servidor de medios personal.', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&q=80', icon: 'https://emby.media/images/logo.png', loading: false },
  { slug: 'navidrome', name: 'Navidrome', category: 'Media', description: 'Streaming de música personal.', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80', icon: 'https://www.navidrome.org/img/logo.png', loading: false },
  
  // Cloud
  { slug: 'nextcloud', name: 'Nextcloud', category: 'Cloud', description: 'Plataforma de colaboración.', image: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=500&q=80', icon: 'https://nextcloud.com/media/logo-nextcloud.svg', loading: false },
  { slug: 'transmission', name: 'Transmission', category: 'Cloud', description: 'Cliente BitTorrent ligero.', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&q=80', icon: 'https://www.vectorlogo.zone/logos/transmissionbt/transmissionbt-icon.svg', loading: false },
  { slug: 'filebrowser', name: 'FileBrowser', category: 'Cloud', description: 'Gestor de archivos web.', image: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=500&q=80', icon: 'https://filebrowser.org/static/img/logo.svg', loading: false },
  
  // Network
  { slug: 'adguard', name: 'AdGuard Home', category: 'Network', description: 'Bloqueador de anuncios DNS.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80', icon: 'https://adguard.com/img/logo.svg', loading: false },
  { slug: 'pihole', name: 'Pi-hole', category: 'Network', description: 'Agujero negro para publicidad.', image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=500&q=80', icon: 'https://static.cdnlogo.com/logos/p/61/pi-hole.svg', loading: false },
  { slug: 'wireguard', name: 'WireGuard', category: 'Network', description: 'VPN moderna y segura.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=500&q=80', icon: 'https://www.vectorlogo.zone/logos/wireguard/wireguard-icon.svg', loading: false },
  
  // Tools
  { slug: 'portainer', name: 'Portainer', category: 'Tools', description: 'Gestión visual de Docker.', image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=500&q=80', icon: 'https://www.portainer.io/hubfs/Imported_Blog_Media/portainer_logo-1.png', loading: false },
  { slug: 'uptimekuma', name: 'Uptime Kuma', category: 'Tools', description: 'Monitoreo de servicios.', image: 'https://images.unsplash.com/photo-1551288049-bbbda536ad37?w=500&q=80', icon: 'https://uptime.kuma.pet/img/icon.svg', loading: false },
  { slug: 'homeassistant', name: 'Home Assistant', category: 'Tools', description: 'Domótica privada y local.', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&q=80', icon: 'https://www.home-assistant.io/images/home-assistant-logo.svg', loading: false },
  { slug: 'glances', name: 'Glances', category: 'Tools', description: 'Monitorización del sistema.', image: 'https://images.unsplash.com/photo-1551808195-2323e3bcc30f?w=500&q=80', icon: 'https://nicolargo.github.io/glances/public/images/glances.png', loading: false }
])

const filteredCatalog = computed(() => {
  return catalog.value.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesTab = activeTab.value === 'all' || app.category === activeTab.value
    return matchesSearch && matchesTab
  })
})

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
      alert(`${app.name} se está instalando. Estará disponible pronto en ${app.slug}.tu-nas.local`)
    } else {
      throw new Error(data.error)
    }
  } catch (e) {
    alert('Error: ' + e.message)
  } finally {
    app.loading = false
  }
}
</script>

<style scoped>
.app-card {
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.app-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.05) !important;
  border-color: rgba(108, 92, 231, 0.4) !important;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4) !important;
}

.glass-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
  width: 100%;
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 40px;
}

.install-btn {
  background: linear-gradient(45deg, #6c5ce7, #00d2ff) !important;
}

.shadow-text {
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}
</style>
