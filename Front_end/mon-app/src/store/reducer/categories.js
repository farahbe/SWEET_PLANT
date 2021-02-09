const initialStates = {
    categories: [],
};

const categoriereducer = (state = initialStates, action) => {
    switch (action.type) {
        case "ENREGISTRE_CATEGORIES":
            return {
                ...state,
                categories: action.categories,
            };
            default:
                return state;
        
    }
};

export default categoriereducer;