import { NextApiHandler, NextApiResponse } from "next";
import connectDB from "../../../middleware/mongodb";
import { APIResponse } from "../../../types/api_response";
import UserModel from "../../../models/user";
import { HTTPMethods } from "../../../consts/http_methods";
import { generalizePhoneNumber } from "../../../utils/converters";

const loginHandler: NextApiHandler = async (
  req,
  res: NextApiResponse<APIResponse>
) => {
  if (req.method == HTTPMethods.Patch) {
    try {
      const { phoneNumber, pin } = JSON.parse(req.body);

      if (phoneNumber && pin) {
        const userDocument = await UserModel.findOne({
          phoneNumber: generalizePhoneNumber(phoneNumber),
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
