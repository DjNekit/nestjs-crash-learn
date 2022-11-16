import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { headers } = req;

    const { data, headers: returnedHeaders } = await axios.post(
      `http://nginx:3000/v1/auth/refresh-tokens`,
      undefined, 
      { headers }
    );

    Object.entries(returnedHeaders).forEach(([headerKey, value]) => {
      res.setHeader(headerKey, value as string)
    })

    res.send(data)

  } catch (e) {
    res.status(200).json({})
  }
}
