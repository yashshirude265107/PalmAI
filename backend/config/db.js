const path = require("path");
const Database = require("better-sqlite3");

const DB_PATH = path.join(__dirname, "..", "palmai.db");

console.log("DATABASE PATH =", DB_PATH);

const db = new Database(DB_PATH);

db.exec(`
CREATE TABLE IF NOT EXISTS users (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    email TEXT UNIQUE NOT NULL,

    password TEXT NOT NULL,

    avatar TEXT DEFAULT '',

    role TEXT DEFAULT 'user',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS reports (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    palmImageUrl TEXT,

    handSide TEXT DEFAULT 'unspecified',

    report TEXT NOT NULL,

    analysisScore INTEGER DEFAULT 0,

    status TEXT DEFAULT 'completed',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id) REFERENCES users(id)

);
`);

module.exports = db;