KnowledgeBases = [
    {
        "key": "none",
        "text": "Geen kennisbank",
    },
    {
        "type": "AzureCognitiveSearch",
        "embedding_name": "text-embeddings-ada-002",
        "embedding_endpoint": "https://laica-v1-0.openai.azure.com",
        "service": "ai-search-v2-0",
        "key": "fnwvwCuSUfVpx2p9R4lPb6S8y2W8RqvyZhqNwSOxDJAzSeDAnSBi",
        "index": "stikstof-24042024",
        "text": "Stikstof",
        "vector_column": "vector",
        "content_columns": "['chunk']",
        "title_column": "llm_title",
        "url_column": "",
        "filename_column": "doc_title",
        # "query_type": "vectorSimpleHybrid",
    },
    {
        "type": "AzureCognitiveSearch",
        "service": "ai-search-v2-0",
        "key": "fnwvwCuSUfVpx2p9R4lPb6S8y2W8RqvyZhqNwSOxDJAzSeDAnSBi",
        "index": "griffie-06062024",
        "text": "Griffie",
        "vector_column": "vector",
        "content_columns": "['chunk']",
        "title_column": "llm_title",
        "url_column": "url",
        "filename_column": "doc_title",
        # "query_type": "vectorSimpleHybrid",
        "embedding_name": "text-embeddings-ada-002",
        "embedding_endpoint": "https://laica-v1-0.openai.azure.com",
    }
]

# met key werkt het, maar geen goede weergave in dropdown
# zonder key werkt het niet, maar wel goede weergave in dropdown? 
# key key lijkt verwarrend te werken.