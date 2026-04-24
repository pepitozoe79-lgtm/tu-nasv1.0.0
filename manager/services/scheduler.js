const { nodes } = require('./nodeManager');

function selectBestNode(appDef) {
  let best = null, bestScore = Infinity;
  for (const [name, data] of nodes.entries()) {
    const load = data.containers ? data.containers.length : 0;
    if (load < bestScore) { bestScore = load; best = name; }
  }
  return best || 'local-node';
}
module.exports = { selectBestNode };
