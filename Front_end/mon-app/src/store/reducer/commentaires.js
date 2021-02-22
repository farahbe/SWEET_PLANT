const initalStates = {
    usercommentaires: [],
};
const commentairereducer = (state = initalStates, action ) => {
    switch (action.type) {
        case "ENREGISTRE_COMMENTAIRE":
            return {
                ...state,
                usercommentaires: action.usercommentaires,
            };
            default:
                return state;
    }
};
export default commentairereducer;