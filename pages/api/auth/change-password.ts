import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { AuthErrors, Errors } from '../../../consts/errors';
import { HTTPMethods } from '../../../consts/http_methods';
import checkAdmin from '../../../middleware/checkAdmin';
import connectDB from '../../../middleware/mongodb';
import UserModel from '../../../models/user';
import { APIResponse } from '../../../types/api_response';

interface ChangePasswordBody {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const changePasswordHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) => {
  try {
    if (req.method !== HTTPMethods.Put) {
      res.redirect(`${process.env.hostname}/404`);
      return;
    }

    const { confirmPassword, oldPassword, password } =
      req.body as ChangePasswordBody;

    if (oldPassword && password && confirmPassword) {
      // Get the currently logged in user
      const { user } = await getSession();

      const userDocument = await UserModel.findOne({
        username: user.name,
      });

      if (!userDocument) {
        throw AuthErrors.USER_NOT_LOGGED_IN;
      }

      // Start checking if the password is correct
      const isPasswordCorrect = await new Promise<boolean | any>((res, rej) => {
        userDocument.comparePassword(oldPassword, (err, isMatch) => {
          if (err) {
            rej(err);
          }
          res(isMatch);
        });
      });

      if (!isPasswordCorrect) {
        throw AuthErrors.INVALID_PASSWORD;
      }

      if (password !== confirmPassword) {
        throw AuthErrors.PASSWORD_NOT_THE_SAME;
      }

      // Start changing the password
      userDocument.password = password;
      await userDocument.save();
      res.status(201);
      return;
    }
    throw Errors.INVALID_PARAMETERS;
  } catch (error) {
    return res.status(500).json({
      error: {
        statusCode: 500,
        message: String(error),
      },
    });
  }
};

export default checkAdmin(connectDB(changePasswordHandler));
