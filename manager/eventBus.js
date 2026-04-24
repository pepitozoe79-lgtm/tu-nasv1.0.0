const db = require('./db');

class EventBus {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.handlers = new Map();
  }

  async init() {
    const rows = db.prepare(`SELECT * FROM event_log WHERE status IN ('pending','failed') ORDER BY priority ASC, created_at ASC`).all();
    for (const row of rows) {
      this.queue.push({
        id: row.id,
        type: row.type,
        payload: JSON.parse(row.payload),
        priority: row.priority,
        retries: 0,
        fork_id: row.fork_id,
        simulated: row.simulated
      });
    }
    this.process();
  }

  emit(type, payload, priority = 5, opts = {}) {
    const { forkId, simulated = false } = opts;
    const stmt = db.prepare(`INSERT INTO event_log (type, payload, priority, fork_id, simulated) VALUES (?, ?, ?, ?, ?)`);
    const info = stmt.run(type, JSON.stringify(payload), priority, forkId, simulated ? 1 : 0);
    this.queue.push({ id: info.lastInsertRowid, type, payload, priority, retries: 0, fork_id: forkId, simulated });
    this.queue.sort((a,b) => a.priority - b.priority);
    this.process();
  }

  on(type, handler) {
    if (!this.handlers.has(type)) this.handlers.set(type, []);
    this.handlers.get(type).push(handler);
  }

  async process() {
    if (this.processing) return;
    this.processing = true;
    while (this.queue.length > 0) {
      const event = this.queue.shift();
      db.prepare(`UPDATE event_log SET status='processing' WHERE id=?`).run(event.id);
      const handlers = this.handlers.get(event.type) || [];
      let success = true;
      for (const h of handlers) {
        try { await h(event.payload, { simulated: event.simulated, forkId: event.fork_id }); }
        catch(err) { success = false; console.error(err); }
      }
      if (success) db.prepare(`UPDATE event_log SET status='processed', processed_at=datetime('now') WHERE id=?`).run(event.id);
      else {
        event.retries++;
        if (event.retries < 3) this.queue.push(event);
        else db.prepare(`UPDATE event_log SET status='dead' WHERE id=?`).run(event.id);
      }
    }
    this.processing = false;
  }
}

module.exports = new EventBus();
