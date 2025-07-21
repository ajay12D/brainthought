import { Schema, model, Types } from "mongoose";


const tag_schema = new Schema({
     title: {
        type: String,
        required: true,
        unique: true
     }
});



export const Tags = model('Tags', tag_schema);