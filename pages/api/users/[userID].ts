import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../middleware/mongodb";
import { APIResponse } from "../../../types/api_response";
import UserModel from "../../../models/user";

const userHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) => {
  const { userID } = req.query;

  try {
    const user = await UserModel.findById(userID.toString()).lean();

    if (!user) {
      res.status(400).json({
        error: {
          message: "User not found!",
          statusCode: 400,
        },
      });
      return;
    }

    res.status(200).json({
      data: user,
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
};

export default connectDB(userHandler);
