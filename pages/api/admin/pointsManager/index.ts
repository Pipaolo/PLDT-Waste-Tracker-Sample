import { NextApiHandler } from 'next';
import { APIResponse } from '../../../../types/api_response';
import connectDB from '../../../../middleware/mongodb';
import checkAdmin from '../../../../middleware/checkAdmin';
import { HTTPMethods } from '../../../../consts/http_methods';
import * as yup from 'yup';
import { validate } from '../../../../middleware/validation';
import item_points from '../../../../models/item_points';

interface PointsInput {
  name: string;
  points: number;
}

const pointsSchema = yup.object().shape({
  name: yup.string().required('This field is required!'),
  points: yup.number().required('This field is required!'),
});

const pointsManagerHandler: NextApiHandler<APIResponse> = async (req, res) => {
  switch (req.method) {
    case HTTPMethods.Get:
      return getItemPoints(req, res);
    case HTTPMethods.Post:
      return createItemPoints(req, res);
    default:
      res.redirect('/unauthorized');
      return;
  }
};

const createItemPoints: NextApiHandler<APIResponse> = async (req, res) => {
  try {
    const body = req.body as PointsInput;
    const itemPoint = await item_points.create(body);

    return res.status(200).json({
      data: itemPoint,
    });
  } catch (err) {
    return res.status(402).json({
      error: {
        message: String(err),
        statusCode: 402,
      },
    });
  }
};

const getItemPoints: NextApiHandler<APIResponse> = async (req, res) => {
  try {
    const itemPoints = await item_points.find().lean();

    return res.status(200).json({
      data: itemPoints,
    });
  } catch (err) {
    return res.status(402).json({
      error: {
        message: String(err),
        statusCode: 402,
      },
    });
  }
};
export default checkAdmin(
  connectDB(validate(pointsSchema, pointsManagerHandler))
);
