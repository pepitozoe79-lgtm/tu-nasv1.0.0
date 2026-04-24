const nodes = new Map();

function handleHeartbeat(socket, payload) {
  nodes.set(payload.name, {
    socket,
    lastSeen: Date.now(),
    containers: payload.containers
  });
}

setInterval(() => {
  const now = Date.now();
  for (const [name, data] of nodes) {
    if (now - data.lastSeen > 15000) nodes.delete(name);
  }
}, 10000);

module.exports = { nodes, handleHeartbeat };
