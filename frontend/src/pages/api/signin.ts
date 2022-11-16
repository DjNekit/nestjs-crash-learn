import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { setHeaders } from '../../helpers/setHeaders';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { body, headers } = req;
    const { data, headers: returnedHeaders } = await axios.post(
      `${process.env.API}/v1/auth/signin`,
      body,
      { headers }
    );

    setHeaders(res, returnedHeaders)

    res.send(data)
  } catch (e: any) {
    // console.log(e)
    // const { data } = e.response
    res.send(e)
  }
}
