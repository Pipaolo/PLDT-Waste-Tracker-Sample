import { NextApiHandler } from 'next';
import { HTTPMethods } from '../../../consts/http_methods';
import connectDB from '../../../middleware/mongodb';
import { APIResponse } from '../../../types/api_response';
import WasteTransactionModel from '../../../models/waste_transaction';

const transactionsHandler: NextApiHandler<APIResponse> = async (req, res) => {
  switch (req.method) {
    case HTTPMethods.Get:
      return getTransactions(req, res);
    default:
      res.redirect('/api/invalid');
  }
};

const getTransactions: NextApiHandler<APIResponse> = async (req, res) => {
  try {
    const transactions = await WasteTransactionModel.find();

    return res.status(200).json({
      data: transactions
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        message: String(error),
        statusCode: 500
      }
    });
  }
};

export default connectDB(transactionsHandler);
