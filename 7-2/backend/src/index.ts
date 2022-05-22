import { listen } from "./server"
import { initDB } from "./db/connection"

async function f() {
  await initDB("localhost", "dbdb", "useruser", "asdf1234")
  await listen("127.0.0.1", 8080)
}

f()
