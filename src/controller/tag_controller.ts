

import { Tags } from "../models/Tags_schema";
import { Request, Response } from "express";

import { RespnseStatus } from '../helper'

interface authnRequest extends Request {

}

export const createTag = async (req: authnRequest, res: Response) => {

    const { title } = req.body;

    try {
        const Tag = await Tags.create({ title: title });
        if (Tag) {
            return res.status(RespnseStatus.success)
                .json({
                    message: 'tag created boy',
                    Tag
                })
        }

        res.status(RespnseStatus.crash)
            .json({
                message: `somthing went wrong , tag isn't created`
            })
    }
    catch (e: any) {
        res.status(RespnseStatus.crash)
            .json({
                message: 'something went wrong',

            })
    }

};


export const getAlltags = async (req: authnRequest, res: Response) => {

    try{
        const tags = await Tags.find();

        if(tags){
            return res.status(RespnseStatus.success)
            .json({
                message: 'here is the list of the tags',
                tags
            })
        }
        res.status(RespnseStatus.crash)
        .json({
            message: 'something went wrong, we did not found any tag'

        })
    }
    catch(e: any){
          res.status(RespnseStatus.success)
          .json({
            message: 'something went wrong',
            error: e.message
          })
    }
}








