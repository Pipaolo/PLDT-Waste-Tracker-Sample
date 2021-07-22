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
      res.redirect('/api/invalid');
  }
};

const getTransactions: NextApiHandler<APIResponse<WasteTransaction[]>> = async (
  req,
  res
) => {
  try {
    const { sortBy } = req.query;

    // Start handling the sorting
    let transactions: Array<WasteTransaction>;

    if (sortBy && sortBy === 'DAILY') {
      const currentDate = moment().startOf('day').toDate();
      const tomorrowDate = moment(currentDate).add(1, 'days').toDate();

      transactions = await WasteTransactionModel.find({
        createdAt: {
          $gte: currentDate,
          $lt: tomorrowDate,
        },
      });
    } else {
      transactions = await WasteTransactionModel.find();
    }

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
