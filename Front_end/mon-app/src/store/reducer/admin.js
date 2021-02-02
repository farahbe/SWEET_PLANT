
const initialStates = {
    token: null, 
    email: null,
    id_admin: null,
};

const adminreducer = (state = initialStates, action) => {
    switch (action.type){
        case "SIGNINADMIN":
        localStorage.setItem("id", action.id)// 'id' =  nom action.id ce qu'il va contenir
        return{
            ...state,
            token: action.token, //recupere ce aue l'on a dans les action
            email: action.email,
            id_admin: action.id,
        }
        case "SIGNOUTADMIN":
            return{
                ...state, 
                token: null,
                email: null,
                id_admin: null,
            }
    default:
        return {
            ...state
        }
    }
}

export default adminreducer;