export const KnowledgeBases = [
    {
        key: 'none',
        text: 'Geen kennisbank',
    },
    {
        key: 'stikstof',
        text: 'Stikstof6',
        endpoint: 'stikstof-v2.azurewebsites.net', // Vul hier de endpoint in
        api_key: 'fnwvwCuSUfVpx2p9R4lPb6S8y2W8RqvyZhqNwSOxDJAzSeDAnSBi', // Vul hier de API key in
        index_name: 'stikstof-24042024', // Vul hier de index naam in
        vector_column: 'vector', // Vul hier de vector column in
        content_columns: ['chunk'], // Vul hier de content columns in
        title_column: 'llm_title', // Vul hier de title column in
        url_column: '', // Vul hier de url column in
        filename_column: 'doc_title', // Vul hier de filename column in
        query_type: 'vectorSimpleHybrid', // Vul hier het query type in
        top_k: 10, // Vul hier het aantal resultaten in
        strictness: 3, // Vul hier de strengheid in
        enable_in_domain: false, // Vul hier in of in-domain zoekopdrachten zijn ingeschakeld
    }
];

// use_semantic_search
// search_service