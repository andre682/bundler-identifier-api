import dotenv from 'dotenv'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()
if (!envFound) {
  // This error should crash whole process

  throw new Error("Couldn't find .env file")
}

export default {
  /**
   * Server port
   */
  port: parseInt(process.env.PORT, 10),
  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
  /**
   * MongoDB string
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * winston logger level
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
}
