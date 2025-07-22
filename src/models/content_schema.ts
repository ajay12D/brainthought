import { Schema, model,Types } from "mongoose";

const contentTypes = ['image', 'video', 'article', 'audio'];


const content_schema = new Schema({
    link:  { type: String, required: true},
    type:  { type: String, enum: contentTypes, required: true},
    title: { type: String, required: true},
    tags:  [{type: Types.ObjectId, ref: 'Tag'}],
    userId: {type: Types.ObjectId, ref: 'user', required: true}
});
        


export const Content = model('Content', content_schema);
