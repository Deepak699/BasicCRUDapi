const mongoose = require("mongoose");
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  age: {
    type: Number,
    required:true,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
  password:{
    type:String,
    required:true,
    minlength: 7,
    trim: true,
    validate(value) {
        if (value.toLowerCase().includes('password')) {
            throw new Error('Password cannot contain "password"')
        }
    }
  },
  gender: {
    type: String,
    required:true
  },
  Email:{
    type:String,
    required:true,
    unique:true,
    validate(value)
    {
        if(!validator.isEmail(value))
        {
            throw new Error("Invalid Email")
        }
    }
},
  tokens: [{
    token: {
        type: String,
        required: true
    }
}],
});

userSchema.pre('save',async function(next){
  const user = this
  if(user.isModified('password'))
  {
  user.password = await bcrypt.hash(user.password,8)
  }
  console.log("middleware bjhvj")
  next()
})
userSchema.methods.generateAuthToken = async function(){
  const user = this
  // console.log(user)
  const token = await jwt.sign({_id:user._id.toString()},process.env.TOKEN)
  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token 
}
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
