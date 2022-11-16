import { NextApiResponse } from 'next';

export const setHeaders = (res: NextApiResponse, headers: Record<string, unknown>) => {
  Object.entries(headers).forEach(([headerKey, value]) => {
    res.setHeader(headerKey, value as string)
  })
}
