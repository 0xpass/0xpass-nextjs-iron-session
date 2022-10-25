import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from "jsonwebtoken"
import { sessionOptions } from '../../lib/session';
import { User } from 'types/user';

const publicKey = process.env.NEXT_PUBLIC_KEY as string

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { authorization: token } = req.headers as { authorization: string } // grab bearer token
  const accessToken = token.split(" ")[1]
  switch (method) {
    case 'GET':
      try {

        // decode jwt and verify the signature with the public key
        // making sure the content is not altered
        const decoded = jwt.verify(accessToken, publicKey) as User

        // putting in session contents. type is defined in lib/session.ts
        req.session.user = {
          isLoggedIn: true,
          userId : decoded.userId,
          envId : decoded.envId,
          address : decoded.address,
        } 

        // save() creates stateless session (cookie) on the client side
        await req.session.save();
        res.json({ ok: true });
      } catch (_error) {
        console.log(_error)
        res.json({ ok: false });
      }
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
