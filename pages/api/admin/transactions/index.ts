import { NextApiHandler } from 'next';
import { HTTPMethods } from '../../../../consts/http_methods';
import connectDB from '../../../../middleware/mongodb';
import { APIResponse } from '../../../../types/api_response';
import WasteTransactionModel, {
  WasteTransaction,
} from '../../../../models/waste_transaction';
import moment from 'moment';
import checkAdmin from '../../../../middleware/checkAdmin';

const transactionsHandler: NextApiHandler<APIResponse> = async (req, res) => {
  switch (req.method) {
    case HTTPMethods.Get:
      return getTransactions(req, res);
    default:
      res.redirect('/404');
      return;
  }
};

const getTransactions: NextApiHandler<APIResponse> = async (req, res) => {
  try {
    // Start handling the sorting
    const transactions = await WasteTransactionModel.find().lean();
    return res.status(200).json({
      data: transactions,
    });
  } catch (error) {
    return res.status(402).json({
      error: {
        message: String(error),
        statusCode: 402,
      },
    });
  }
};

export default checkAdmin(connectDB(transactionsHandler));
