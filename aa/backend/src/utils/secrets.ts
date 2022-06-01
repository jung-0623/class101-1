import path from "path"
import fs from "fs"

export let secret: Record<string, any> = {}

export function initSecret(): Promise<void> {
  const file = path.join(__dirname, "..", "..", "secret.json")
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        reject(err)
        return
      }

      secret = JSON.parse(data)
      resolve()
    })
  })
}
