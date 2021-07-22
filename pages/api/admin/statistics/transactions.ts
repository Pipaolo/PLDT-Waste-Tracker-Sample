import { NextApiHandler } from 'next';
import { HTTPMethods } from '../../../../consts/http_methods';
import connectDB from '../../../../middleware/mongodb';
import { APIResponse } from '../../../../types/api_response';
import WasteTransactionModel from '../../../../models/waste_transaction';
import moment from 'moment';
import checkAdmin from '../../../../middleware/checkAdmin';

const transactionHandler: NextApiHandler<APIResponse> = async (req, res) => {
  if (req.method === HTTPMethods.Get) {
    const { sortBy } = req.query;
    switch (sortBy) {
      case 'DAILY':
        return getDailyTransactionsStats(req, res);
      default:
        return getOverallTransactionsStats(req, res);
    }
  }
  res.redirect('/404');
  return;
};

const getDailyTransactionsStats: NextApiHandler<APIResponse> = async (
  req,
  res
) => {
  try {
    // Start aggregating
    const currentDate = moment().startOf('day').toDate();
    const tomorrowDate = moment(currentDate).add(1, 'days').toDate();
    const stats = await WasteTransactionModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: currentDate,
            $lt: tomorrowDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          batteries: { $sum: '$batteries' },
          phones: { $sum: '$phones' },
          chargers: { $sum: '$chargers' },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    if (!stats[0]) {
      return res.status(200).json({
        data: {
          batteries: 0,
          phones: 0,
          chargers: 0,
        },
      });
    }
    return res.status(200).json({
      data: stats[0],
    });
  } catch (err) {
    return res.status(500).json({
      error: {
        message: String(err),
        statusCode: 500,
      },
    });
  }
};

const getOverallTransactionsStats: NextApiHandler<APIResponse> = async (
  req,
  res
) => {
  try {
    // Start Aggregating
    const stats = await WasteTransactionModel.aggregate([
      {
        $group: {
          _id: null,
          batteries: { $sum: '$batteries' },
          phones: { $sum: '$phones' },
          chargers: { $sum: '$chargers' },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    if (!stats[0]) {
      return res.status(200).json({
        data: {
          batteries: 0,
          phones: 0,
          chargers: 0,
        },
      });
    }
    return res.status(200).json({
      data: stats[0],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: {
        message: String(err),
        statusCode: 500,
      },
    });
  }
};

export default checkAdmin(connectDB(transactionHandler));
