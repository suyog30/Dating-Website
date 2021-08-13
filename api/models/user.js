const mongoose = require("mongoose")
const crypto = require("crypto")
const { v1: uuidv1 } = require('uuid');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        reqired: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    bio: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    gender: {
        type: String,
        required: true
    },
    lookingfor: {
        type: String,
        required: true
    },
    birthday: { 
        type: Date,
        required: true,
        trim: true
    },
    profileImgUrl: { 
        type: String,
        required: true
    },
    isAdmin: {
        type: Number,
        default: 0
    },
    isSoftDeleted: {
        type: Number,
        default: 0
    },
    matches: {
        type: Array,
        "default" : []
    },
    rightSwipes: {
        type: Array,
        "default" : []
    },
    leftSwipes: {
        type: Array,
        "default" : []
    }
}, {timestamps: true})


userSchema.virtual("password")
    .set(function(password) {
        this._password = password
        this.salt = uuidv1()
        this.encry_password = this.securePassword(password)
    })
    .get(function(){
        return this._password
    })


userSchema.methods = {
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) == this.encry_password
    },

    securePassword: function(plainpassword){
        if(!plainpassword) return "";

        try {
            return crypto.createHmac("sha256", this.salt).update(plainpassword).digest("hex")
        }catch(err){
            return "ERROR IN ENCRYPTING PASSWORD"
        }
    }
}

module.exports = mongoose.model("User", userSchema)