const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const aluminiSchema = new Schema({
  name:  {
    type: String,
    required: true,
    trim: true
  }, 
  surname:  {
    type: String,
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
    maxlength: 550
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true
  },
  linkedinId: {
    type: String,
    required: true
  },
  institute: {
    type: String,
    required: true
  },
  degree: {
    type: String
  },
  regNo: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  exp: {
    type: String,
    required: true
  },
  about: {
    type: String
  },
  encry_password: {
    type: String,
    required: true
  },
  salt: String,
  role: {
    type: Number,
    default: 1
  },
  aluminiVerify: {
    type: Boolean,
    default: false,
  }
});

aluminiSchema.virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  })

aluminiSchema.methods = {
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

module.exports = mongoose.model("Alumini", aluminiSchema);
