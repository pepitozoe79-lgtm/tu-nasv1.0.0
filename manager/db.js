const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join('/data', 'tu-nas.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS event_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    payload TEXT,
    priority INTEGER DEFAULT 5,
    fork_id TEXT,
    simulated INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    processed_at DATETIME,
    status TEXT DEFAULT 'pending'
  );

  CREATE TABLE IF NOT EXISTS apps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE,
    name TEXT,
    domain TEXT,
    status TEXT DEFAULT 'stopped',
    node TEXT,
    namespace TEXT DEFAULT 'default',
    version INTEGER DEFAULT 1,
    desired_spec TEXT
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    app_slug TEXT,
    name TEXT,
    container_name TEXT,
    image TEXT,
    status TEXT
  );

  CREATE TABLE IF NOT EXISTS nodes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    host TEXT,
    token TEXT,
    status TEXT DEFAULT 'offline',
    last_seen DATETIME,
    labels TEXT DEFAULT '[]'
  );

  CREATE TABLE IF NOT EXISTS namespaces (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    cpu_limit INTEGER,
    ram_limit INTEGER,
    disk_limit_gb REAL
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user'
  );

  CREATE TABLE IF NOT EXISTS snapshots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT,
    last_event_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = db;
