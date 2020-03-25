export default class PostService {
  constructor(container) {
    this.Post = container.sequelize.models.Post
    this.logger = container.logger
  }
  async list({ order, q, limit }) {
    this.logger.silly(`[Post Service] Find all posts`)
    try {
      const records = await this.Post.findAll()
      return records
    } catch (error) {
      throw error
    }
  }
  async findById({ id }) {
    this.logger.silly(`[Post Service] Find all posts`)
    try {
      const records = await this.Post.findByPk(id)
      return records
    } catch (error) {
      throw error
    }
  }
  async create({ title, content, author }) {
    this.logger.silly(`[Post Service] Find all posts`)
    try {
      const records = await this.Post.operation({ title, content, author })
      return records
    } catch (error) {
      throw error
    }
  }
  async update({ id, title, content, author }) {
    this.logger.silly(`[Post Service] Find all posts`)
    try {
      const records = await this.Post.operation({ id, title, content, author })
      return records
    } catch (error) {
      throw error
    }
  }
  async remove({ id }) {
    this.logger.silly(`[Post Service] Find all posts`)
    try {
      const records = await this.Post.operation({ id })
      return records
    } catch (error) {
      throw error
    }
  }
}
