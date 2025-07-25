import {Schema, model} from 'mongoose';

const schema = new Schema({
    username: {
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

export const User = model('user', schema);




