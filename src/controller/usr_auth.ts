import { User} from '../models/usr_schema';
import {RespnseStatus} from  '../helper';
import bcrypt from 'bcryptjs';
import jwt from  'jsonwebtoken';

import { Request, Response } from "express";
interface AuthRequest extends Request {
    user?: string
}

export const signUp = async (req:Request,res: Response) =>{
   const { username, password} = req.body;

   try{
      const alredyExist = await User.findOne({username}); 

      if(alredyExist){
        return res.status(RespnseStatus.success)
        .json({
            message: 'user is already exist',
        })
      }

      const hasedPasswrd = await bcrypt.hash(password, 12);

      const user = await User.create({
        username:username,
        password: hasedPasswrd,
      })

      if(user){
        return res.status(RespnseStatus.success)
        .json({
            message: 'user succesfully signUp'
        })
      }
       return res.status(RespnseStatus.crash)
        .json({
            message: 'user succesfully signUp'
        })
   }
   catch(e:any){
      res.status(RespnseStatus.crash)
        .json({
            message: 'something went wrong',
            error: e.message
        })
   }

};


export const signIn = async (req:any,res: any) => {

  const {username, password} = req.body;
  let kl; 

  try{
    let token;
    const user= await User.findOne({username});
    if(user){
        const compare = await bcrypt.compare(password,user.password);

        if(compare){
          token = jwt.sign({id: user._id}, 'ajay123456789',
            {
              expiresIn: '5h'
            }  
          )
          return res.status(RespnseStatus.success).
          json({
            message: 'user logged in',
            token: token
          })
        }
    }
 res.status(RespnseStatus.crash).
          json({
            message: 'invalid credentials',
          })

  }
  catch(e:any){
         res.status(RespnseStatus.crash)
        .json({
            message: 'something went wrong',
            error: e.message
        })
  }
}


 interface users {
  "_id": string,
  "username": string,
  "password": string
   "__v": number
 }

export const ge_users = async (req:AuthRequest,res:Response) =>{
         //@ts-ignore   
  const {user} = req;

       if(user){
        const usrs: users[] = await User.find();
          return res.status ( RespnseStatus.success)
          .json({
            message: 'here is the all the users',
            usrs:  usrs.map(u => u.username)
          })
       }
       else{
        return  res.status(RespnseStatus.success)
        .json({
          message:`somtheing went wrong, we did'nt found any user`
        })
       }
       
}