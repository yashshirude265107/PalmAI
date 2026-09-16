const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DATA_DIR = path.join(__dirname, "..", "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

/**
 * Loads the JSON "database" from disk, creating it with empty collections
 * if it doesn't exist yet. This is the entire persistence layer for the
 * database-free build — no MongoDB, no Atlas signup, no connection string.
 */
function loadDB() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  if (!fs.existsSync(DB_FILE)) {
    const initial = { users: [], reports: [] };
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
    return initial;
  }

  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  } catch (err) {
    console.error("Failed to parse data/db.json — starting with a fresh empty database.", err.message);
    return { users: [], reports: [] };
  }
}

const db = loadDB();

/** Writes the current in-memory state back to disk. Called after every mutation. */
function persist() {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

/** Generates a Mongo-ObjectId-like unique string so frontend code needs no changes. */
function generateId() {
  return crypto.randomBytes(12).toString("hex");
}

module.exports = { db, persist, generateId };
