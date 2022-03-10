import { cors } from '../../../infra/httpServer/cors'
import { app, json } from "../../../infra/httpServer/express-server"
import { routers } from '../../routers'

export const makeHttpServer = () => {
  app.use(cors())
  app.use(json())
  app.use(routers)
  return app
}