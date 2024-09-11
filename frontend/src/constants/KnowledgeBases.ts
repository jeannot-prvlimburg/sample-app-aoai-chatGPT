export const KnowledgeBases = [
    {
        key: 'stikstof',
        text: 'Stikstof',
        endpoint: '', // Vul hier de endpoint in
        api_key: 'fnwvwCuSUfVpx2p9R4lPb6S8y2W8RqvyZhqNwSOxDJAzSeDAnSBi', // Vul hier de API key in
        index_name: 'stikstof-24042024', // Vul hier de index naam in
        vector_column: '', // Vul hier de vector column in
        content_columns: ['chunk'], // Vul hier de content columns in
        title_column: '', // Vul hier de title column in
        url_column: '', // Vul hier de url column in
        filename_column: 'doc_title', // Vul hier de filename column in
        query_type: 'vector', // Vul hier het query type in
        top_k: 5, // Vul hier het aantal resultaten in
        strictness: 3, // Vul hier de strengheid in
        enable_in_domain: false, // Vul hier in of in-domain zoekopdrachten zijn ingeschakeld
    }
];