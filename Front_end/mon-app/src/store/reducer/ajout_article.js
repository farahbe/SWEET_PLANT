const initialStates = {
    article: [],
    id: String
};

const articlereducer = (state = initialStates, action) => {
    switch (action.type) {
        case "ENREGISTRE_ARTICLE":
            return {
                ...state,
                article: action.article,
            };
        case "CREATE_STORE_ARTICLE": //le type appeler par l'action
            return{
                ...state, // toutes les states precedentes
                article: [...state.article, /*action.createarticleforstore*/{

                    ...action.payload,
                    id: action.id
                }], // article, qui correspond a article[] tableau vide 
                //...state.article = tout les articles precedent + action.createarticleforstore = l'article ajouter(ajoute +1)
            };

            default:
                return {
                    ...state,
                };
        }
    };
    
    export default articlereducer;