import os

import cohere
import numpy as np
from dotenv import load_dotenv
from fastapi import FastAPI
from qdrant_client import QdrantClient
from fastapi.middleware.cors import CORSMiddleware
load_dotenv()

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


co = cohere.Client(os.getenv("COHERE_API_KEY"))


@app.get("/search/{query}")
def read_item(query: str):
    vector = co.embed([query]).embeddings[0]
    print(os.getenv("QDRANT_URL"), os.getenv("QDRANT_API_KEY"))
    qdrant_client = QdrantClient(url=os.getenv("QDRANT_URL"), api_key=os.getenv("QDRANT_API_KEY"))
    print("client loaded")
    query_vector = np.array(vector).astype(np.float64)
    print("query_vector")
    hits = qdrant_client.search(
        collection_name="documents",
        query_vector=query_vector,
        limit=5
    )
    return {"hits": hits}
