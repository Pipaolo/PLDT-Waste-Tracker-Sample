import { NextApiHandler, NextApiResponse } from "next";
import { HTTPMethods } from "../../../consts/http_methods";
import connectDB from "../../../middleware/mongodb";
import { APIResponse } from "../../../types/api_response";
import UserModel from "../../../models/user";
import { generalizePhoneNumber } from "../../../utils/converters";

const registerHandler: NextApiHandler = async (
  req,
  res: NextApiResponse<APIResponse>
) => {
  if (req.method == HTTPMethods.Post) {
    const { pin, phoneNumber, name, points } = JSON.parse(req.body);
    try {
      console.log(req.body);
      if (pin && phoneNumber && name) {
        const userDocument = await UserModel.create({
          pin,
          phoneNumber: generalizePhoneNumber(phoneNumber),
          name,
          points,
        });

        const response: APIResponse = {
          data: userDocument.toJSON(),
        };

        res.status(200).json(response);
        return;
      }

      const response: APIResponse = {
        error: {
          message: "invalid data",
          statusCode: 400,
        },
      };

      res.status(400).json(response);
      return;
    } catch (error) {
      res.status(500).json({
        error: {
          message: error.message,
          statusCode: 500,
        },
      });
      return;
    }
  }
  res.redirect("/api/invalid");
};

export default connectDB(registerHandler);
