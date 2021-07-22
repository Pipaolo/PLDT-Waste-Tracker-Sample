import { errorMonitor } from "events";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Errors } from "../../../consts/errors";
import { APIResponse } from "../../../types/api_response";
import UserModel from "../../../models/user";
import { METHODS } from "http";
import { HTTPMethods } from "../../../consts/http_methods";
import { redirect } from "next/dist/next-server/server/api-utils";
import connectDB from "../../../middleware/mongodb";


type RegisterBody = {
    username?:String;
    password?:String;
    accessLevel?: Number;
}

export const registerHandler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<APIResponse> ,
    ) => {
        if(req.method !== HTTPMethods.Post){
             res.redirect(`${process.env.hostname}/404`);
             return;
        }
        try {

        const {username, password, accessLevel} = req.body as RegisterBody;
        
        if(username != null &&
            password != null &&
            accessLevel != null){
             const user = await UserModel.create({
                    username,
                    password,
                    accessLevel,
                }).then((uDoc) => uDoc.toObject());
                
            
                console.log(user);
            return res.status(200).json({
                data:"Hello There!",
            });
        }
    
        throw Errors.INVALID_PARAMETERS;
      
    } catch (error) {
        return res.status(500).json({
            error: {
                statusCode: 500,
                message: String(error),
            }
        })
    }
    return;
}

export default connectDB(registerHandler);