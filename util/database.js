import sqlite3 from 'sqlite3'
import path from 'path'

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFileName = "../database/obbligo_vertita_db.db"

export function getObblighi() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(
      path.join(__dirname, dbFileName)
    )

    const sql = "SELECT rowId, * FROM obblighi"
    db.all(sql, (err, row) => {
      if (err) return reject(err)
      
      resolve(row)
    })

    db.close()
  })
}

export function getVerita() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(
      path.join(__dirname, dbFileName)
    )

    const sql = "SELECT rowId, * FROM verita"
    db.all(sql, (err, row) => {
      if (err) return reject(err)
      
      resolve(row)
    })

    db.close()
  })
}