import mongoose, { connect } from "mongoose";



 export async function connectDb(): Promise<void>{
    const res =   await mongoose.connect("mongodb+srv://ajaydikoina:BdGn2Xl0CBkX0tdS@cluster0.owaslrz.mongodb.net/brainDb?retryWrites=true&w=majority&appName=Cluster0");
      if(res){
           console.log('connection is established mongoDb');
      }  
      else{
        console.log('connection is not estabished with mongoDb')
      }
  };











