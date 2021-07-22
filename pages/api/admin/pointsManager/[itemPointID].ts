import { NextApiHandler } from 'next';
import { HTTPMethods } from '../../../../consts/http_methods';
import checkAdmin from '../../../../middleware/checkAdmin';
import connectDB from '../../../../middleware/mongodb';
import item_points, { ItemPoint } from '../../../../models/item_points';
import { APIResponse } from '../../../../types/api_response';
import * as yup from 'yup';
import { validate } from '../../../../middleware/validation';

const itemPointSchema = yup.object().shape({
  name: yup.string().required(),
  number: yup.number().required(),
});

const itemPointHandler: NextApiHandler<APIResponse> = async (req, res) => {
  switch (req.method) {
    case HTTPMethods.Get:
      return getItemPoint(req, res);
    case HTTPMethods.Patch:
      return editItemPoint(req, res);
    case HTTPMethods.Delete:
      return deleteItemPoint(req, res);
    default:
      res.redirect('/404');
      return;
  }
};

const editItemPoint: NextApiHandler<APIResponse> = async (req, res) => {
  try {
    const body = req.body as ItemPoint;
    const { itemPointID } = req.query;
    const itemPoint = await item_points.findByIdAndUpdate(itemPointID, body);
    return res.status(200).json({
      data: itemPoint,
    });
  } catch (err) {
    return res.status(400).json({
      error: {
        message: String(err),
        statusCode: 400,
      },
    });
  }
};

const getItemPoint: NextApiHandler<APIResponse> = async (req, res) => {
  try {
    const { itemPointID } = req.query;
    const itemPoint = await item_points.findById(itemPointID);

    return res.status(200).json({
      data: itemPoint,
    });
  } catch (err) {
    return res.status(400).json({
      error: {
        message: String(err),
        statusCode: 400,
      },
    });
  }
};
const deleteItemPoint: NextApiHandler<APIResponse> = async (req, res) => {
  if (req.method !== HTTPMethods.Delete) {
    res.redirect('/404');
    return;
  }

  try {
    const { itemPointID } = req.query;

    await item_points.deleteOne({
      _id: itemPointID,
    });

    return res.status(200).json({
      data: 'Deleted Successfully!',
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
  connectDB(validate(itemPointSchema, itemPointHandler))
);
