import { listen } from "./server"

async function f() {
  await listen("127.0.0.1", 8080)
}

f()
