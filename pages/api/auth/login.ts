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
      const { phoneNumber, password } = req.body;

      if (phoneNumber && password) {
        const userDocument = await UserModel.findOne({
          phoneNumber: generalizePhoneNumber(phoneNumber),
        });

        if (!userDocument) {
          throw Error("Invalid Username/Password");
        }

        const [err, isMatch] = await new Promise((res, rej) => {
          userDocument.comparePassword(password, (err, isMatch) => {
            return res([err, isMatch]);
          });
        });

        if (!isMatch) {
          throw Error("Invalid Username/Password");
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
