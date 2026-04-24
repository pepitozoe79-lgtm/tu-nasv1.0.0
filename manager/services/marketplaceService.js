const { installApp } = require('./composeService');
const { addProxy } = require('./proxyService');

const APP_CATALOG = {
  // Media & Entertainment
  jellyfin: {
    slug: 'jellyfin',
    name: 'Jellyfin',
    category: 'Media',
    services: [{ name: 'app', image: 'jellyfin/jellyfin:latest' }],
    port: 8096,
    description: 'Servidor de medios libre.'
  },
  plex: {
    slug: 'plex',
    name: 'Plex',
    category: 'Media',
    services: [{ name: 'app', image: 'plexinc/pms-docker:latest' }],
    port: 32400,
    description: 'Organiza y transmite tu colección de medios.'
  },
  
  // Cloud & Files
  nextcloud: {
    slug: 'nextcloud',
    name: 'Nextcloud',
    category: 'Cloud',
    services: [{ name: 'app', image: 'nextcloud:latest' }],
    port: 80,
    description: 'Tu nube privada de archivos.'
  },
  transmission: {
    slug: 'transmission',
    name: 'Transmission',
    category: 'Download',
    services: [{ name: 'app', image: 'linuxserver/transmission:latest' }],
    port: 9091,
    description: 'Cliente BitTorrent rápido y fácil.'
  },

  // Smart Home & IoT
  homeassistant: {
    slug: 'homeassistant',
    name: 'Home Assistant',
    category: 'IoT',
    services: [{ name: 'app', image: 'ghcr.io/home-assistant/home-assistant:stable' }],
    port: 8123,
    description: 'Domótica privada y local.'
  },

  // Network & Security
  adguard: {
    slug: 'adguard',
    name: 'AdGuard Home',
    category: 'Network',
    services: [{ name: 'app', image: 'adguard/adguardhome:latest' }],
    port: 3000,
    description: 'Bloqueador de anuncios DNS.'
  },
  pihole: {
    slug: 'pihole',
    name: 'Pi-hole',
    category: 'Network',
    services: [{ name: 'app', image: 'pihole/pihole:latest' }],
    port: 80,
    description: 'Agujero negro para publicidad en red.'
  },

  // Tools
  portainer: {
    slug: 'portainer',
    name: 'Portainer',
    category: 'Tools',
    services: [{ name: 'app', image: 'portainer/portainer-ce:latest' }],
    port: 9000,
    description: 'Interfaz gráfica para gestionar Docker.'
  },
  uptimekuma: {
    slug: 'uptimekuma',
    name: 'Uptime Kuma',
    category: 'Tools',
    services: [{ name: 'app', image: 'louislam/uptime-kuma:1' }],
    port: 3001,
    description: 'Herramienta de monitoreo de servicios.'
  }
};

async function deployFromMarketplace(appSlug) {
  const appDef = APP_CATALOG[appSlug];
  if (!appDef) throw new Error('Aplicación no encontrada en el catálogo');

  console.log(`🚀 Desplegando ${appDef.name} desde el Marketplace...`);
  await installApp(appDef);
  addProxy(`${appDef.slug}.tu-nas.local`, `${appDef.slug}-app`, appDef.port);
  
  return appDef;
}

module.exports = { deployFromMarketplace, APP_CATALOG };
