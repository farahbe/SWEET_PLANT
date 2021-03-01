const initialStates = {
    emailuser: [],
};

const emailreducer = (state = initialStates, action) => {
    switch (action.type) {
        case 'ENREGISTRE_EMAIL':
            return {
                ...state,
                emailuser: action.emailuser,
            };
            default:
                return {
                    ...state,
                };
    }
};
export default emailreducer;