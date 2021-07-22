import { NextApiHandler } from 'next';
import { HTTPMethods } from '../../../consts/http_methods';
import connectDB from '../../../middleware/mongodb';
import { APIResponse } from '../../../types/api_response';

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
    return res.status(200).json({
      data: 'Daily Transactions',
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
  } catch (err) {
    return res.status(500).json({
      error: {
        message: String(err),
        statusCode: 500,
      },
    });
  }
};

export default connectDB(transactionHandler);
