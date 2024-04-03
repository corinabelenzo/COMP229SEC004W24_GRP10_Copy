import mongoose from 'mongoose';
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: 'First Name is required'
    },
    lastName: {
        type: String,
        trim: true,
        required: 'Last Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    usertype: {
        type: String,
        enum: ['patient', 'dentist', 'receptionist', 'admin'],
    },
    birthday: {
        type: String,
        required: [function() {
            return this.usertype === 'patient';
        }, 'Birthday is required for patients'],
    },
    age: {
        type: Number,
        required: [function() {
            return this.usertype === 'patient';
        }, 'Age is required for patients'],
    },
    gender: {
        type: String,
        required: [function() {
            return this.usertype === 'patient';
        }, 'Gender is required for patients'],
    },
    contactNumber: {
        type: String,
        required: [function() {
            return this.usertype === 'patient';
        }, 'Contact Number is required for patients'],
    },
    address: {
        type: String,
        required: [function() {
            return this.usertype === 'patient';
        }, 'Address is required for patients'],
    },
    allergies: {
        type: String,
        required: [function() {
            return this.usertype === 'patient';
        }, 'Allergies is required for patients'],
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    hashed_password: {
        type: String,
        required: 'Password is required'
    },
    salt: String
});
UserSchema.virtual('password')
.set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password)
    //this.hashed_password = password;
})

.get(function() {
    return this._password;
});

UserSchema.path('hashed_password').validate(function(v) {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.');
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required');
    }
}, null);

UserSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password 
    
    },
    encryptPassword: function(password) { 
        if (!password) return ''
        try {
            return crypto
            .createHmac('sha1', this.salt) 
            .update(password)
            .digest('hex') 
        } catch (err) {
            return '' 
        }
    },
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '' 
    }
}
    
export default mongoose.model('User', UserSchema);