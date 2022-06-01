import { listen } from "./server"
import { initDB } from "./db/connection"
import { initSecret, secret } from "./utils/secrets"

async function f() {
  console.log("init start")
  await initSecret()
  await initDB(secret.db.host, "dbdb", secret.db.username, secret.db.password)
  await listen(secret.http.host, secret.http.port)
  console.log("int end")
}

f()
