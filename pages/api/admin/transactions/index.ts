import { NextApiHandler } from 'next';
import { HTTPMethods } from '../../../../consts/http_methods';
import connectDB from '../../../../middleware/mongodb';
import { APIResponse } from '../../../../types/api_response';
import WasteTransactionModel, {
  WasteTransaction,
} from '../../../../models/waste_transaction';
import ItemPointsModel from '../../../../models/item_points';
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
    const items = await ItemPointsModel.find().lean();

    // Start computing for the number of points for each transaction
    const transactionsWithPoints = transactions.map((t) => {
      const phones = items.find((i) => i.name === 'phones');
      const batteries = items.find((i) => i.name === 'batteries');
      const chargers = items.find((i) => i.name === 'chargers');

      const totalPoints =
        t.phones * phones.points +
        t.batteries * batteries.points +
        t.chargers * chargers.points;
      return {
        ...t,
        points: totalPoints,
      };
    });
    return res.status(200).json({
      data: transactionsWithPoints,
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
