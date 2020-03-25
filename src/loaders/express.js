import bodyParser from 'body-parser'
import cors from 'cors'
import routes from '../api'
import config from '../config'
import logger from '../../dist/loaders/logger'

export default ({ app }) => {
  app.get('/status', (req, res) => {
    res.status(200).end()
  })
  app.head('/status', (req, res) => {
    res.status(200).end()
  })

  app.enable('trust proxy')
  app.use(cors())
  app.use(require('method-override')())
  app.use(bodyParser.json())
  app.use(config.api.prefix, routes())

  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err['status'] = 404
    logger.error(err)
    next(err)
  })

  app.use((err, req, res, next) => {
    logger.error(err)
    res.status(err.status || 500)
    return res.json({
      errors: {
        message: err.message,
      },
    })
  })
}
