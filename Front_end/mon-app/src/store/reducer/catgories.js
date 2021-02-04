const initialStates = {
    categories: [],
};

const categoriereducer = (state = initialStates, action) => {
    switch (action.type) {
        case "ENREGISTRE_CATEGORIE":
            return {
                ...state,
                categories: action.categories,
            };
        
    }
};

export default categoriereducer;