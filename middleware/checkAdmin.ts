import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

const checkAdmin =
  (handler) => async (req: NextApiRequest, res: NextApiResponse) => {
    // Start checking for admin authentication;
    const session = await getSession({
      req,
    });

    if (!session) {
      res.redirect('/500');
      return;
    }
    return handler(req, res);
  };

export default checkAdmin;
