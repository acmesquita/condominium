import { makeHttpServer } from './factories/server'

const app = makeHttpServer()

app.listen(3030, () => {
  console.log("Server runing http://localhost:3030")
})