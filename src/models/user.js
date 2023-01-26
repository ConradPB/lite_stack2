import mongoose from 'mongoose'


const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique:true,
      required: true,
    }
  },
  { timestamps: true },
)

userSchema.statics.findByLogin = async function (login) {
    let user = await this.findOne({
      first_name: login,
      last_name: login
    })
  
    if (!user) {
      user = await this.findOne({ email: login });
    }
  
    return user
  }

  userSchema.pre('remove', function(next) {
    this.model('Question', 'Answer').deleteMany({ user: this._id }, next);
  })

const User = mongoose.model('User', userSchema)

export default User