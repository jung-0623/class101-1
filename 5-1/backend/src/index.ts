import { insertPost, selectPostsByAuthor, selectUser } from "./db/queries"

async function f() {
  console.log("BEFORE")
  console.log(await selectPostsByAuthor(1))
  await insertPost("새로운 글", 1)
  console.log("AFTER")
  console.log(await selectPostsByAuthor(1))
}

f()
