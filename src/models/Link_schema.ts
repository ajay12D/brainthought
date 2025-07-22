
import { Schema, model, Types } from "mongoose";


const link_schema = new Schema({
    hash: {type: String, required: true},
    userId: {type: Types.ObjectId, ref: 'Users', required: true}
});

export const Link = model('Link', link_schema);

