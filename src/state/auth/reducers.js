import { LOG_IN_FINISHED, LOG_OUT, LOG_IN_FAILED, TRY_LOG_IN } from "./types";

const initialState = {
    user: {
        isLoggedIn:false, 
        loginError:null,
        loading:false
    }
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRY_LOG_IN:
            return { isLoggedIn: false, loginError:null, loading:true };
        case LOG_IN_FINISHED:
            return {...action.payload, isLoggedIn: true, loginError:null, loading:false };
        case LOG_IN_FAILED:
                return {...state, isLoggedIn: false, loginError:action.payload, loading:false };
        case LOG_OUT:
            return { isLoggedIn: false, loading:false };

        default:
            return state;
    }
};

export default authReducer;