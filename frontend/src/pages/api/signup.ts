import axios, { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { setHeaders } from '../../helpers/setHeaders';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { body, headers } = req;
    const { data, headers: returnedHeaders } = await axios.post(
      `${process.env.API}/v1/auth/signup`,
      body,
      { headers }
    );

    setHeaders(res, returnedHeaders)

    res.send(data)
  } catch (e: any) {
    const { data } = e.response
    res.status(data.statusCode).json(data)
  }
}
