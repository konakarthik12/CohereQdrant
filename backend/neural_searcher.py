import os

from dotenv import load_dotenv
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer

load_dotenv()

# class NeuralSearcher:
#
#     def __init__(self, collection_name: str):
#         self.collection_name = collection_name
#         self.model = SentenceTransformer('distilbert-base-nli-stsb-mean-tokens', device='cpu')
#         self.qdrant_client = QdrantClient(url=os.getenv("QDRANT_URL"), api_key=os.getenv("QDRANT_API_KEY"))
#
#     def search(self, text: str, filter_: dict = None) -> List[dict]:
#         vector = self.model.encode(text).tolist()
#         hits = self.qdrant_client.search(
#             collection_name=self.collection_name,
#             query_vector=vector,
#             query_filter=Filter(**filter_) if filter_ else None,
#             limit=5
#         )
#         return [hit.payload for hit in hits]
#
print(os.getenv("QDRANT_URL"), os.getenv("QDRANT_API_KEY"))
qdrant_client = QdrantClient(url=os.getenv("QDRANT_URL"), api_key=os.getenv("QDRANT_API_KEY"))
print("client loaded")
model = SentenceTransformer('distilbert-base-nli-stsb-mean-tokens', device='cpu')
print("model loaded")
vector = model.encode("text").tolist()
print("vector", vector)
hits = qdrant_client.search(
    collection_name="startups",
    query_vector=vector,
    limit=5
)
print("hits", hits)
print([hit.payload for hit in hits])
print("done")
# searcher = NeuralSearcher(collection_name='startups')
# searcher.search('hello world')
