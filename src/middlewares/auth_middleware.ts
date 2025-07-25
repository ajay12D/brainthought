import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { RespnseStatus } from '../helper'
import { User } from "../models/usr_schema";

interface CustomJwtPayload extends JwtPayload {
    id: string
}

interface AuthRequest extends Request {
    user?: string
}
export const authM = (req: AuthRequest, res: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(RespnseStatus.crash).
                json({
                    message: 'authorization headers is missing'
                })
        }
        const token: string = authHeader.split(" ")[1]
        if (!token) {
            return res.status(RespnseStatus.crash)
                .json({
                    message: 'invalid token'
                })
        }

        const decode = jwt.verify(token, 'ajay123456789') as CustomJwtPayload;

        req.user = decode.id;

        next();


    }
    catch(e: any){
        res.status(RespnseStatus.crash)
        .json({
            message: 'somthing  went wrong',
            error: e.message
        })
    }
        
}