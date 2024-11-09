from vertexai.preview import rag
from vertexai.preview.generative_models import GenerativeModel, Tool
import vertexai

def handle_rag(question:str):
    project_id = "reliable-proton-439907-v3"
    display_name = "My First Project"
    paths = ["gs://bucket-rag-hackru"]

    vertexai.init(project=project_id, location="us-central1")

    embedding_model_config = rag.EmbeddingModelConfig(
       publisher_model="publishers/google/models/text-embedding-004"
    )


    rag_corpus = rag.create_corpus(
       display_name=display_name,
       embedding_model_config=embedding_model_config,
    )
    # rag_corpus = rag.get_corpus(
    #     name="projects/reliable-proton-439907-v3/locations/us-central1/ragCorpora/8070450532247928832"

    # )

    rag.import_files(
        rag_corpus.name,
        paths,
        chunk_size=512,
        chunk_overlap=100,  
        max_embedding_requests_per_min=900,  
    )


    response = rag.retrieval_query(
        rag_resources=[
            rag.RagResource(
                rag_corpus=rag_corpus.name,
                # Optional: supply IDs from `rag.list_files()`.
                # rag_file_ids=["rag-file-1", "rag-file-2", ...],
            )
        ],
        text=question,
        similarity_top_k=10,  # Optional
        vector_distance_threshold=0.5,  # Optional
    )

    rag_retrieval_tool = Tool.from_retrieval(
        retrieval=rag.Retrieval(
            source=rag.VertexRagStore(
                rag_resources=[
                    rag.RagResource(
                        rag_corpus=rag_corpus.name,  # Currently only 1 corpus is allowed.
                        # Optional: supply IDs from `rag.list_files()`.
                        # rag_file_ids=["rag-file-1", "rag-file-2", ...],
                    )
                ],
                similarity_top_k=3,  # Optional
                vector_distance_threshold=0.5,  # Optional
            ),
        )
    )
    # Create a gemini-pro model instance
    rag_model = GenerativeModel(
        model_name="gemini-1.5-flash-001", tools=[rag_retrieval_tool]
    )

    # Generate response
    response = rag_model.generate_content(question)
    return response.text

