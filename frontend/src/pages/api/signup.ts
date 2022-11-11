import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { body, headers } = req;
    console.log(body)
    const { data, headers: returnedHeaders } = await axios.post(
      `${process.env.BACK_API}/v1/auth/signup`,
      body,
      { headers }
    );

    Object.entries(returnedHeaders).forEach(([headerKey, value]) => {
      res.setHeader(headerKey, value as string)
    })

    res.send(data)

  } catch (e: any) {
    const { data } = e.response
    res.status(data.statusCode).json(data)
  }
}
