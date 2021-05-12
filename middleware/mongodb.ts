import mongoose from "mongoose";
import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";


const connectDB = handler  => async(req: NextApiRequest, res: NextApiResponse ) => {
    if(mongoose.connections[0].readyState){
        return handler(req,res);
    }

    await mongoose.connect(process.env.mongodbURL, {
        useUnifiedTopology:true,
        useCreateIndex:true,
        useNewUrlParser:true,

    })
    return handler(req,res)
}

export default connectDB;