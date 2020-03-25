import mongoose from 'mongoose'

const Bundle = new mongoose.Schema(
  {
    buildNumber: {
      type: Number,
      required: [true, 'Please enter the build number'],
    },

    bundleId: {
      type: String,
      required: [true, 'Please enter bundle identifier'],
      unique:true
    }
  },
  { timestamps: true }
)

export default mongoose.model('Bundle', Bundle)
