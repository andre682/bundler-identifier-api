import { Router } from 'express'
import bottle from '../../loaders/bottle'
import { celebrate, Joi } from 'celebrate'

const route = Router()
export default app => {
  app.use('/posts', route)

  route.get(
    '/list',
    celebrate({
      query: Joi.object({
        order: Joi.string(),
        q: Joi.string(),
        limit: Joi.number(),
      }),
    }),
    async (req, res, next) => {
      const { order, q, limit } = req.query
      const logger = bottle.container.logger
      try {
        const postServiceInstance = bottle.container.postService
        const response = await postServiceInstance.list({ order, q, limit })
        if (response) {
          return res.status(200).json(res.bodyresponse)
        } else {
          return res.status(204)
        }
      } catch (error) {
        logger.error(error)
        return next(error)
      }
    }
  )
  route.get(
    '/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      const { id } = req.params
      const logger = bottle.container.logger
      try {
        const postServiceInstance = bottle.container.postService
        const response = await postServiceInstance.findById({ id })
        if (response) {
          return res.status(200).json(response)
        } else {
          return res.status(204).json({})
        }
      } catch (error) {
        return next(error)
      }
    }
  )
  route.post(
    '/new',
    celebrate({
      body: Joi.object({
        title: Joi.string(),
        content: Joi.string(),
        author: Joi.string(),
      }),
    }),
    async (req, res, next) => {
      const { title, content, author } = req.body
      const logger = bottle.container.logger
      try {
        const postServiceInstance = bottle.container.postService
        const response = await postServiceInstance.create({ title, content, author })
        if (response) {
          return res.status(200).json(response)
        } else {
          return res.status(204)
        }
      } catch (error) {
        logger.error(error)
        return next(error)
      }
    }
  )

  route.put(
    '/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string(),
      }),
      body: Joi.object({
        title: Joi.string(),
        content: Joi.string(),
        author: Joi.string(),
      }),
    }),
    async (req, res, next) => {
      const { id } = req.params
      const { title, content, author } = req.body
      const logger = bottle.container.logger
      try {
        const postServiceInstance = bottle.container.postService
        const response = await postServiceInstance.update({ id, title, content, author })
        if (response) {
          return res.status(200).json(response)
        } else {
          return res.status(204)
        }
      } catch (error) {
        logger.error(error)
        return next(error)
      }
    }
  )

  route.delete(
    '/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      const { id } = req.params
      const logger = bottle.container.logger
      try {
        const postServiceInstance = bottle.container.postService
        const response = await postServiceInstance.remove({ id })
        if (response) {
          return res.status(200).json(response)
        } else {
          return res.status(204)
        }
      } catch (error) {
        logger.error(error)
        return next(error)
      }
    }
  )
}
