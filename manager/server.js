const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bus = require('./eventBus');
const { installApp } = require('./services/composeService');
const { addProxy } = require('./services/proxyService');
const { handleHeartbeat } = require('./services/nodeManager');
const { reconcile } = require('./services/reconciliationService');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => res.json({ ok: true }));

app.post('/api/apps/install', async (req, res) => {
  try {
    const appDef = req.body;
    await installApp(appDef);
    addProxy(`${appDef.slug}.tu-nas.local`, `${appDef.slug}-app`);
    bus.emit('app.installed', appDef);
    res.json({ ok: true });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('Cliente conectado');
  socket.on('action', ({ type, payload }) => bus.emit(type, payload));
  socket.on('node:heartbeat', (payload) => handleHeartbeat(socket, payload));
});

bus.init().then(() => console.log('EventBus listo'));

setInterval(reconcile, 5000);

server.listen(80, () => console.log('tu-nas manager en puerto 80'));
