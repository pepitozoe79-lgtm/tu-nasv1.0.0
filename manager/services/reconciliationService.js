const db = require('../db');
const docker = require('./dockerService');

async function reconcile() {
  const containers = await docker.listContainers();
  for (const c of containers) {
    if (c.State !== 'running') {
      try {
        await docker.restartContainer(c.Id);
      } catch(e) {}
    }
  }
}
module.exports = { reconcile };
