import {
    SET_CURRENT_USER,
    UPDATE_COURSE_REGISTERED,
    USER_LOADING
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case UPDATE_COURSE_REGISTERED: 
            return { 
               ...state, 
               user: {...state.user, 
                    ongoing_courses: [...state.user.ongoing_courses, action.payload] 
                } 
            }
        default:
            return state;
    }
}