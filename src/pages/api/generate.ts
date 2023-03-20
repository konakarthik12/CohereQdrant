import type {NextApiRequest, NextApiResponse} from 'next'


import cohere from "cohere-ai";


cohere.init(process.env.COHERE_API_KEY);

async function generate(prompt) {
  const response = await cohere.generate({
    prompt,
    temperature: 0.8,
    max_tokens: 300,
    model: "command-xlarge-nightly",
  });
  return response.body.generations[0].text;
}

// const cohere = require('cohere-ai');
// cohere.init('top secret codes')
//
// prompt = "generate a poem about roses"

// async function generate(prompt) {
//   const response = await cohere.generate({
//     prompt: prompt,
//     temperature: 0.8,
//     max_tokens: 30
//   });
//   return response.body.generations[0].text;
// }


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const document = await generate(req.query.q)
  res.status(200).json({document})
}
