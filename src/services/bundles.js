export default class BundlesService {
  constructor(container) {
    this.bundlesModel = container.bundlesModel
    this.logger = container.logger
  }
  async readBundleId({ bundleId }) {
    this.logger.silly(`Reading Bundle Id: ${bundleId}`)
    try {
      const bundleRecord = await this.bundlesModel.findOne({
        bundleId: { $regex: new RegExp(`^${bundleId.toLowerCase()}$`, 'i') },
      })
      return bundleRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }

  async setBuildNumber({ bundleId, newBuildNumber }) {
    this.logger.silly(`Looking for bundle (${bundleId})`)
    try {
      let bundleRecord = await this.bundlesModel.findOne({
        bundleId: { $regex: new RegExp(`^${bundleId.toLowerCase()}$`, 'i') },
      })
      if (!bundleRecord) {
        bundleRecord = await this.initBundle({ bundleId, buildNumber: newBuildNumber })
      } else {
        if (newBuildNumber > bundleRecord.buildNumber) {
          bundleRecord.buildNumber = newBuildNumber
          bundleRecord = await bundleRecord.save()
        }
      }
      return bundleRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }
  async initBundle({ bundleId, buildNumber = 0 }) {
    this.logger.silly(`Creating new Bundle Identifier: (${bundleId})`)
    try {
      const bundleRecord = await this.bundlesModel.create({ bundleId, buildNumber })
      return bundleRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }

  async bumpBuild({ bundleId }) {
    this.logger.silly(`bumping next (${bundleId})`)
    try {
      let bundleRecord = await this.bundlesModel.findOne({
        bundleId: { $regex: new RegExp(`^${bundleId.toLowerCase()}$`, 'i') },
      })
      if (!bundleRecord) {
        bundleRecord = await this.initBundle({ bundleId })
      }
      bundleRecord.buildNumber++
      bundleRecord = await bundleRecord.save()
      return bundleRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }
}
