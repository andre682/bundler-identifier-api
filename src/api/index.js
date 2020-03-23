import { Router } from 'express'
import posts from './routes/posts'

export default () => {
  const app = Router()
  posts(app)
  return app
}
