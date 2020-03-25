import { Router } from 'express'
import bottle from '../../loaders/bottle'
import { celebrate, Joi } from 'celebrate'

const route = Router()
const bundleIdentifierRegExp = /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/i
export default app => {
  app.use(route)

  route.get(
    '/read',
    celebrate({
      query: Joi.object({
        bundle_id: Joi.string()
          .regex(bundleIdentifierRegExp)
          .required(),
      }),
    }),
    async (req, res, next) => {
      const { bundle_id } = req.query
      const logger = bottle.container.logger
      logger.debug('Calling read service endpoint')
      try {
        const bundlesServiceInstance = bottle.container.bundlesService
        const bundles = await bundlesServiceInstance.readBundleId({ bundleId: bundle_id })
        if (bundles) {
          return res.status(200).json(bundles)
        } else {
          return res.status(204).json(bundles)
        }
      } catch (e) {
        logger.error('error: %o', e)
        return next(e)
      }
    }
  )

  route.post(
    '/set',
    celebrate({
      query: Joi.object({
        bundle_id: Joi.string()
          .regex(bundleIdentifierRegExp)
          .required(),
        new_build_number: Joi.number().min(0),
      }),
    }),
    async (req, res, next) => {
      const { bundle_id, new_build_number } = req.query
      const logger = bottle.container.logger
      logger.debug('Calling set service endpoint')
      try {
        const bundlesServiceInstance = bottle.container.bundlesService
        const bundles = await bundlesServiceInstance.setBuildNumber({ bundleId:bundle_id, newBuildNumber:new_build_number })
        return res.status(200).json(bundles)
      } catch (e) {
        logger.error('error: %o', e)
        return next(e)
      }
    }
  )

  route.post(
    '/bump',
    celebrate({
      query: Joi.object({
        bundle_id: Joi.string()
          .regex(bundleIdentifierRegExp)
          .required(),
      }),
    }),
    async (req, res, next) => {
      const { bundle_id } = req.query
      const logger = bottle.container.logger
      logger.debug('Calling bump service endpoint')
      try {
        const bundlesServiceInstance = bottle.container.bundlesService
        const bundles = await bundlesServiceInstance.bumpBuild({ bundleId:bundle_id })
        return res.status(201).json(bundles)
      } catch (e) {
        logger.error('error: %o', e)
        return next(e)
      }
    }
  )
}
