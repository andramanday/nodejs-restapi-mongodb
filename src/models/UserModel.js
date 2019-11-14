import mongoose from'mongoose'
import validator from'validator'
import bcrypt from'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    mobile: {
        type: String,
        min: 10,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    ktp: [{
        nik: {
            type: String,
            required: true,
        },
        nama: {
            type: String,
            required: true,
            trim: true
        },
        pob: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: true
        },
        ktpaddress: {
            type: String,
            required: true
        },
        domisili: {
            type: String,
            required: true
        },
        job: {
            type: String,
            require: true
        }
    }],
    documents :[{
        doctitle: {
            type: String
        },
        docimg: {
            type: String
        }
    }],
    contact:[{
        name: {
            type: String
        },
        mobile: {
            type: String
        }
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User