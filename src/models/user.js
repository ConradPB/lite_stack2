import mongoose from 'mongoose'
const Schema = mongoose.Schema
const userSchema = new mongoose.Schema({
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
  },
  email: 
  { type: String, 
    unique: true,
    sparse:true
  },
  password: { 
    type: String,
    unique:true,
    required: true,
  },
  token: { 
    type: String 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},
{ timestamps: true },
)


userSchema.statics.findByLogin = async function (login) {
    let user = await this.findOne({
      username: login,
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