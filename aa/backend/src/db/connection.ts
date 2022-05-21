import mysql from "mysql2/promise"
import initQueries from "./initQueries"

let pool: mysql.Pool | undefined

export async function initDB(
  host: string,
  database: string,
  user: string,
  password: string,
): Promise<void> {
  pool = await mysql.createPool({ host, database, user, password })
  await Promise.all(initQueries.split(";").map((q) => pool!.query(q)))
}

export function conn(): mysql.Pool {
  if (!pool) {
    throw Error("no db connection")
  }
  return pool
}
