const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

function installApp(appDef) {
  const projectDir = path.join('/opt/tu-nas/apps', appDef.slug);
  fs.mkdirSync(projectDir, { recursive: true });

  const compose = {
    version: '3',
    services: {}
  };
  for (const svc of appDef.services) {
    compose.services[svc.name] = {
      image: svc.image,
      container_name: `${appDef.slug}-${svc.name}`,
      restart: 'unless-stopped'
    };
  }
  fs.writeFileSync(path.join(projectDir, 'docker-compose.yml'), yaml.dump(compose));

  return new Promise((resolve, reject) => {
    const proc = spawn('docker', ['compose', '-f', path.join(projectDir, 'docker-compose.yml'), 'up', '-d']);
    proc.on('close', code => code === 0 ? resolve() : reject(new Error('docker compose up falló')));
  });
}

module.exports = { installApp };
