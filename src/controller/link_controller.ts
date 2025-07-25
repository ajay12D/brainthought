

import { Link } from "../models/Link_schema";

import { Request, Response } from "express";

import bcrypt from 'bcryptjs';
import { RespnseStatus } from '../helper'
import { Content } from "../models/content_schema";

interface AuthReq extends Request {
  user?: string
}

export const LinkCreation = async (req: AuthReq, res: Response) => {

  const userId = req.user;
  const { share } = req.body;
  if (!userId) {
    return res.status(RespnseStatus.crash)
      .json({
        message: 'user not exist or invalid user'
      })
  }
  try {
    const hashId = await bcrypt.hash(userId, 10);
    let linkInfo;
    if (share) {
      linkInfo = await Link.create({
        hash: hashId,
        userId: userId
      })
    }
    else {
      await Link.deleteOne({ userId });
    }

    if(linkInfo) {
      const encodedHash = encodeURIComponent(linkInfo.hash)
      return res.status(RespnseStatus.success)
        .json({
          link: `http://localhost:3000/api/v1/brain/${encodedHash}`,
          linkInfo
        })
    }
    res.status(RespnseStatus.crash)
      .json({
        message: `something went wrong, link can't be gernated`
      })
  }

  catch (e: any) {
    res.status(RespnseStatus.crash)
      .json({
        message: 'somthing went wrong',
        error: e.message
      })
  }
};


export const getConentBylink = async (req: Request, res: Response) => {

  const hash = req.params.shareLink ;

  console.log(':: hash', hash)
  try {
    const LinkInfo = await Link.findOne({ hash: hash });

      if(!LinkInfo){
        return res.status(RespnseStatus.crash)
        .json({
          message: 'link is expired'
        })
      }
    console.log('::: id is', LinkInfo.userId);

    const content = await Content.find({ userId: LinkInfo?.userId }).populate("userId", "username");

    if (content) {
      return res.status(RespnseStatus.success)
        .json({
          message: 'here is the user content',
          content: content
        })
    }
    res.status(RespnseStatus.crash)
      .json({
        message: 'somethon went wrong, we did not found any content'
      })
  }
  catch (e: any) {
    res.status(RespnseStatus.crash)
      .json({
        message: 'somthing went wrong',
        errr: e.message
      })
  }
}