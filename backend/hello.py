from dotenv import load_dotenv
import os
from qdrant_client import QdrantClient

load_dotenv()

client = QdrantClient(url=os.getenv("QDRANT_URL"), api_key=os.getenv("QDRANT_API_KEY"), )
from qdrant_client.models import Distance, VectorParams

client.recreate_collection(
    collection_name="my_collection",
    vectors_config=VectorParams(size=100, distance=Distance.COSINE),
)
my_collection_info = client.get_collection("my_collection")
print(my_collection_info.dict())
import numpy as np
from qdrant_client.models import PointStruct

vectors = np.random.rand(100, 100)
client.upsert(
    collection_name="my_collection",
    points=[
        PointStruct(
            id=idx,
            vector=vector.tolist(),
        )
        for idx, vector in enumerate(vectors)
    ]
)
query_vector = np.random.rand(100)
hits = client.search(
    collection_name="my_collection",
    query_vector=query_vector,
    query_filter=None,  # Don't use any filters for now, search across all indexed points
    append_payload=True,  # Also return a stored payload for found points
    limit=5  # Return 5 closest points
)

from qdrant_client.http.models import Filter, FieldCondition, Range

hits = client.search(
    collection_name="my_collection",
    query_vector=query_vector,
    query_filter=Filter(
        must=[  # These conditions are required for search results
            FieldCondition(
                key='rand_number',  # Condition based on values of `rand_number` field.
                range=Range(
                    gte=0.5  # Select only those results where `rand_number` >= 0.5
                )
            )
        ]
    ),
    append_payload=True,  # Also return a stored payload for found points
    limit=5  # Return 5 closest points
)
from qdrant_client import QdrantClient

# client = QdrantClient(host="localhost", grpc_port=6334, prefer_grpc=True)
