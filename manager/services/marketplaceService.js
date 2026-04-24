const { installApp } = require('./composeService');
const { addProxy } = require('./proxyService');

const APP_CATALOG = {
  // Media
  jellyfin: { slug: 'jellyfin', name: 'Jellyfin', category: 'Media', services: [{ name: 'app', image: 'jellyfin/jellyfin:latest' }], port: 8096, description: 'Servidor de medios libre.' },
  plex: { slug: 'plex', name: 'Plex', category: 'Media', services: [{ name: 'app', image: 'plexinc/pms-docker:latest' }], port: 32400, description: 'Organiza y transmite tus medios.' },
  emby: { slug: 'emby', name: 'Emby', category: 'Media', services: [{ name: 'app', image: 'emby/embyserver:latest' }], port: 8096, description: 'Servidor de medios personal.' },
  navidrome: { slug: 'navidrome', name: 'Navidrome', category: 'Media', services: [{ name: 'app', image: 'deluan/navidrome:latest' }], port: 4533, description: 'Tu colección de música en streaming.' },
  
  // Cloud
  nextcloud: { slug: 'nextcloud', name: 'Nextcloud', category: 'Cloud', services: [{ name: 'app', image: 'nextcloud:latest' }], port: 80, description: 'Tu nube privada de archivos.' },
  transmission: { slug: 'transmission', name: 'Transmission', category: 'Cloud', services: [{ name: 'app', image: 'linuxserver/transmission:latest' }], port: 9091, description: 'Cliente BitTorrent ligero.' },
  filebrowser: { slug: 'filebrowser', name: 'FileBrowser', category: 'Cloud', services: [{ name: 'app', image: 'filebrowser/filebrowser:latest' }], port: 80, description: 'Gestor de archivos web.' },
  picoshare: { slug: 'picoshare', name: 'Picoshare', category: 'Cloud', services: [{ name: 'app', image: 'mtlynch/picoshare:latest' }], port: 4001, description: 'Comparte archivos de forma simple.' },

  // Red
  adguard: { slug: 'adguard', name: 'AdGuard Home', category: 'Network', services: [{ name: 'app', image: 'adguard/adguardhome:latest' }], port: 3000, description: 'Bloqueador de anuncios DNS.' },
  pihole: { slug: 'pihole', name: 'Pi-hole', category: 'Network', services: [{ name: 'app', image: 'pihole/pihole:latest' }], port: 80, description: 'Agujero negro para publicidad.' },
  wireguard: { slug: 'wireguard', name: 'WireGuard', category: 'Network', services: [{ name: 'app', image: 'linuxserver/wireguard:latest' }], port: 51820, description: 'VPN moderna y segura.' },
  npm: { slug: 'npm', name: 'Nginx Proxy Manager', category: 'Network', services: [{ name: 'app', image: 'jc21/nginx-proxy-manager:latest' }], port: 81, description: 'Gestiona tus dominios fácilmente.' },

  // Herramientas
  portainer: { slug: 'portainer', name: 'Portainer', category: 'Tools', services: [{ name: 'app', image: 'portainer/portainer-ce:latest' }], port: 9000, description: 'Gestión visual de Docker.' },
  uptimekuma: { slug: 'uptimekuma', name: 'Uptime Kuma', category: 'Tools', services: [{ name: 'app', image: 'louislam/uptime-kuma:1' }], port: 3001, description: 'Monitoreo de servicios.' },
  dozzle: { slug: 'dozzle', name: 'Dozzle', category: 'Tools', services: [{ name: 'app', image: 'amir20/dozzle:latest' }], port: 8080, description: 'Visualizador de logs en tiempo real.' },
  glances: { slug: 'glances', name: 'Glances', category: 'Tools', services: [{ name: 'app', image: 'nicolargo/glances:latest' }], port: 61208, description: 'Monitorización avanzada del sistema.' },
  
  // IoT (Se agrupa en Herramientas por ahora)
  homeassistant: { slug: 'homeassistant', name: 'Home Assistant', category: 'Tools', services: [{ name: 'app', image: 'ghcr.io/home-assistant/home-assistant:stable' }], port: 8123, description: 'Domótica privada y local.' }
};

async function deployFromMarketplace(appSlug) {
  const appDef = APP_CATALOG[appSlug];
  if (!appDef) throw new Error('Aplicación no encontrada');
  await installApp(appDef);
  addProxy(`${appDef.slug}.tu-nas.local`, `${appDef.slug}-app`, appDef.port);
  return appDef;
}

module.exports = { deployFromMarketplace, APP_CATALOG };
