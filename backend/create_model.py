import json
import os
import numpy as np
from dotenv import load_dotenv

from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams

load_dotenv()
# from qdrant_demo.config import DATA_DIR, COLLECTION_NAME, QDRANT_HOST, QDRANT_PORT

BATCH_SIZE = 256

if __name__ == '__main__':
    print(os.getenv("QDRANT_URL"), os.getenv("QDRANT_API_KEY"))
    qdrant_client = QdrantClient(url=os.getenv("QDRANT_URL"), api_key=os.getenv("QDRANT_API_KEY"))
    vectors_path = os.path.join(".", 'vectors.npy')
    vectors = np.load(vectors_path)
    vector_size = vectors.shape[1]
    json_file = open('data.json', 'r')
    # payload = json.load(json_file)
    # payload_path = json.loads('data.json')
    # with open(payload_path) as fd:
    #     payload = list(map(json.loads, fd))
    payload = json.load(json_file)
    qdrant_client.recreate_collection(
        collection_name="documents",
        vectors_config=VectorParams(size=vector_size, distance="Cosine")
    )

    qdrant_client.upload_collection(
        collection_name="documents",
        vectors=vectors,
        payload=payload,
        ids=None,
        batch_size=BATCH_SIZE,
        parallel=2
    )
