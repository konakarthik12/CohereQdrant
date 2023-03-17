// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'


import cohere from "cohere-ai";

const base_url = process.env.QDRANT_URL
const api_key = process.env.QDRANT_API_KEY
const collection_name = "documents"
cohere.init(process.env.COHERE_API_KEY);

async function embed(query) {
  const response = await cohere.embed({
    texts: [query],
    model: "multilingual-22-12",
  });
  return response.body.embeddings[0];
}

async function qdrantSearch(query) {
  const vector = await embed(query)
  // console.log(embedding)
  const url = new URL(`/collections/${collection_name}/points/search`, base_url)
  // const options = {
  //
  //   body: '{"vector":[0.2,0.1,0.9,0.7],"limit":5}'
  // };

  // fetch('https://2e366342-0e12-4f7e-8772-cc72f8f39464.us-east-1-0.aws.cloud.qdrant.io:6333/collections/documents/points/search', options)
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.error(err));
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': api_key,
    },
    body: JSON.stringify({
      vector,
      with_payload: true,
      limit: 5
    })
  })
  const data = await response.json()
  return data.result;
  // return await response.json()
  // return r

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const hits = await qdrantSearch(req.query.q)
  res.status(200).json({hits})
}
