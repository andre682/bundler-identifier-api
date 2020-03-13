import { Router } from 'express'
import bundles from './routes/bundle'

export default () => {
  const app = Router()
  bundles(app)
  return app
}
