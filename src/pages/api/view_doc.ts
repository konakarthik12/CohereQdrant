// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'


import cohere from "cohere-ai";
import * as fs from "fs/promises";


cohere.init(process.env.COHERE_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const file = await fs.readFile('documents/AWSGuide.md', 'utf8')

  res.status(200).json({file})
}
