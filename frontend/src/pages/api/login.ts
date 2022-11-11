// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, headers } = req;

  try {
    
  } catch (e) {
    console.log(e)
    res.status(500).json({})
  }
}
