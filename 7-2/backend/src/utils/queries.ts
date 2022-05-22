import { RowDataPacket } from "mysql2"
import { conn } from "../db/connection"
import { mustOne } from "./errors"

export async function select<T>(sql: string, values: any): Promise<T[]> {
  const [rows] = await conn().query<RowDataPacket[]>(sql, values)
  return rows as T[]
}

export async function selectOne<T>(
  sql: string,
  values: any,
  e: unknown,
): Promise<T> {
  const rows = await select(sql, values)
  return mustOne(rows, e)
}
