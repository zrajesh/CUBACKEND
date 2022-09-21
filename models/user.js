const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const userSchema = new Schema({
  name:  {
    type: String,
    required: true,
    maxlength: 32,
    trim: true
  }, 
  surname:  {
    type: String,
    maxlength: 32,
    trim: true
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  aboutMe: {
    type: String,
    maxlength: 50
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true,
  },
  linkedinId: {
    type: String
  },
  institute: {
    type: String,
    required: true,
  },
  degree: {
    type: String
  },
  regNo: {
    type: String
  },
  domain: {
    type: String
  },
  exp: {
    type: String
  },
  about: {
    type: String
  },
  website: {
    type: String
  },
  encry_password: {
    type: String,
    required: true
  },
  salt: String,
  role: {
    type: Number,
    default: 0,
    required: true
  },
  aluminiVerify: {
    type: Boolean,
    default: false,
  }
});

userSchema.virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  })

userSchema.methods = {
  authenticate: function(plainPassword) {
    return this.securePassword(plainPassword) === this.encry_password;
  }, 

  securePassword: function(plainPassword) {
    if(!plainPassword) return "";
    try {
      return crypto.createHmac('sha256', this.salt)
        .update(plainPassword)
        .digest('hex');
    } catch (error) {
      return "";
    }
  }
}

module.exports = mongoose.model("User", userSchema);
