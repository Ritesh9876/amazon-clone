const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userName: {
      type: String,
    },
    email:{
      type:String
    },
    hash: {
      type: String,
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true }
);

const USER_MODEL = mongoose.model(
  "User",
  UserSchema
);

module.exports = USER_MODEL;
