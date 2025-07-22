import { Content } from "../models/content_schema";
import {RespnseStatus} from '../helper';
import { Request, Response } from "express";
interface AuthRequest extends Request {
    user?: string
}

export const createContent = async (req: AuthRequest, res: Response) => {

    const userId = req.user
    const content_details = req.body;

        try{
           const content = await Content.create({
            link : content_details.link,
            type: content_details.type,
            title: content_details.title,
            tags: content_details.tags,
            userId: userId
           });

           if(content){
            return res.status(RespnseStatus.success)
            .json({
              message: 'content is successfully listed',
            })
           }

           res.status(RespnseStatus.crash).
           json({
                 message: 'something went wrong , yur contnet is not listed'
           })
        }
        catch(e: any){
                 res.status(RespnseStatus.crash)
                 .json({
                    message: 'something went wrong',
                    error: e.message
                 })
        }  

};


export const getContent = async (req: AuthRequest, res: Response) => {

    const userId = req.user

    try{
        const content = await Content.find({userId:userId}).populate("userId", "username");

        if(content){
        return res.status(RespnseStatus.success)
        .json({
            message: "here is your listed content",
            content
        })
        }

          res.status(RespnseStatus.crash)
          .json({
            message: 'something went wrong, we not found any content'
          })
    }
    catch(e: any){
            res.status(RespnseStatus.crash)
            .json({
                message: 'something went wrong',
                error:  e.message 
            })
    }
      
}


export const delContnet = async (req: AuthRequest, res: Response) => 
{

      const userd = req.user;
      try{
        const del = await Content.deleteOne({userId:userd});

        if(del){
            return res.status(RespnseStatus.success)
            .json({
                message: " conetnet is deleted successsfully",
                
            })
        }
        res.status(RespnseStatus.crash)
        .json({
            message: "something went wrong",
        })
      }

      catch(e: any){
        res.status(RespnseStatus.crash)
        .json({
            message: "something went wrong",
            error: e.message
        })
      }
}