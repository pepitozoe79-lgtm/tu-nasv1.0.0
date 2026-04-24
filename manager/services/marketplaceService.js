const { installApp } = require('./composeService');
const { addProxy } = require('./proxyService');

const APP_CATALOG = {
  jellyfin: {
    slug: 'jellyfin',
    name: 'Jellyfin',
    services: [
      { name: 'app', image: 'jellyfin/jellyfin:latest' }
    ],
    port: 8096
  },
  nextcloud: {
    slug: 'nextcloud',
    name: 'Nextcloud',
    services: [
      { name: 'app', image: 'nextcloud:latest' }
    ],
    port: 80
  },
  homeassistant: {
    slug: 'homeassistant',
    name: 'Home Assistant',
    services: [
      { name: 'app', image: 'ghcr.io/home-assistant/home-assistant:stable' }
    ],
    port: 8123
  },
  adguard: {
    slug: 'adguard',
    name: 'AdGuard Home',
    services: [
      { name: 'app', image: 'adguard/adguardhome:latest' }
    ],
    port: 3000
  }
};

async function deployFromMarketplace(appSlug) {
  const appDef = APP_CATALOG[appSlug];
  if (!appDef) throw new Error('Aplicación no encontrada en el catálogo');

  console.log(`🚀 Desplegando ${appDef.name} desde el Marketplace...`);
  
  // 1. Instalar vía Docker Compose
  await installApp(appDef);
  
  // 2. Configurar el Proxy dinámicamente
  // La URL será: jellyfin.tu-nas.local (o la IP del servidor)
  addProxy(`${appDef.slug}.tu-nas.local`, `${appDef.slug}-app`, appDef.port);
  
  return appDef;
}

module.exports = { deployFromMarketplace, APP_CATALOG };
