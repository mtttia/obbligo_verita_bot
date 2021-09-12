import sqlite3 from 'sqlite3'
import path from 'path'

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFileName = "obbligo_vertita_db.db"

const obblighi = "CREATE TABLE `obblighi` (`testo` TEXT NOT NULL,`indice` TEXT);"
const verita = "CREATE TABLE `verita` (`testo` TEXT NOT NULL,`indice` TEXT);"
const partite = "CREATE TABLE `partite` (`giocatori` TEXT NOT NULL,`obblighi` TEXT,`verita` TEXT);"
const proposte = "CREATE TABLE `proposte` (`testo` TEXT NOT NULL,`tipo` TEXT);"

const db = new sqlite3.Database(path.join(__dirname, dbFileName), sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    else
        console.log('Connected to the in-memory SQlite database.');
});

db.serialize(function() {
  db.run(obblighi);
  db.run(verita);
  db.run(partite);
  db.run(proposte);
});

db.close();