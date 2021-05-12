import { NextApiHandler, NextApiResponse } from "next";
import connectDB from "../../../middleware/mongodb";
import { APIResponse } from "../../../types/api_response";
import UserModel from "../../../models/user";
import { HTTPMethods } from "../../../consts/http_methods";

const loginHandler: NextApiHandler = async (
  req,
  res: NextApiResponse<APIResponse>
) => {
  if (req.method == HTTPMethods.Patch) {
    try {
      const { username, pin } = JSON.parse(req.body);
      if (username && pin) {
        const userDocument = await UserModel.findOne({
          username,
          pin,
        });

        if (!userDocument) {
          res.status(200).json({
            error: {
              message: "Invalid Username/Pin",
              statusCode: 400,
            },
          });
          return;
        }

        res.status(200).json({
          data: userDocument.toJSON(),
        });
        return;
      }

      res.status(400).json({
        error: {
          message: "invalid data",
          statusCode: 400,
        },
      });
      return;
    } catch (error) {
      res.status(400).json({
        error: {
          message: error.message,
          statusCode: 400,
        },
      });
      return;
    }
  }
  res.redirect("/api/invalid");
};

export default connectDB(loginHandler);
