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
  console.log("db:", host, database)
  await Promise.all(initQueries.split(";").map((q) => pool!.execute(q)))
}

export function conn(): mysql.Pool {
  if (!pool) {
    throw Error("no db connection")
  }
  return pool
}
