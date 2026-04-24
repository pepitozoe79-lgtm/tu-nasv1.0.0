const io = require('socket.io-client');
const Docker = require('dockerode');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

const MANAGER_URL = process.env.MANAGER_URL || 'http://localhost';
const NODE_NAME = process.env.NODE_NAME || 'local-node';
const TOKEN = process.env.NODE_TOKEN || 'secreto';

const socket = io(MANAGER_URL, { auth: { token: TOKEN } });

socket.on('connect', () => console.log(`Agente ${NODE_NAME} conectado`));

setInterval(async () => {
  const containers = await docker.listContainers({ all: true });
  socket.emit('node:heartbeat', {
    name: NODE_NAME,
    containers: containers.map(c => ({ id: c.Id, name: c.Names[0], state: c.State }))
  });
}, 5000);

socket.on('app:deploy', async (appDef, cb) => {
  try {
    const { spawn } = require('child_process');
    const path = require('path');
    const fs = require('fs');
    const yaml = require('js-yaml');
    const projectDir = path.join('/opt/tu-nas/apps', appDef.slug);
    fs.mkdirSync(projectDir, { recursive: true });
    const compose = { version: '3', services: {} };
    for (const svc of appDef.services) {
      compose.services[svc.name] = { image: svc.image, container_name: `${appDef.slug}-${svc.name}`, restart: 'unless-stopped' };
    }
    fs.writeFileSync(path.join(projectDir, 'docker-compose.yml'), yaml.dump(compose));
    const proc = spawn('docker', ['compose', '-f', path.join(projectDir, 'docker-compose.yml'), 'up', '-d']);
    proc.on('close', code => {
      if (code === 0) cb({ ok: true });
      else cb({ ok: false, error: 'Error al desplegar' });
    });
  } catch(e) {
    cb({ ok: false, error: e.message });
  }
});
