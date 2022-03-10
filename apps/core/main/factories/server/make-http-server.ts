import { app, json } from "../../../infra/httpServer/express-server"
import { routers } from '../../routers'

export const makeHttpServer = () => {
  //TODO add cors
  app.use(json())
  app.use(routers)
  return app
}