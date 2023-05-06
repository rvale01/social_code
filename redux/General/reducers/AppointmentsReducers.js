import { GET_APPOINTMENT, SET_NAME, GET_TYPESEVENT, SET_OBJECT } from '../actions/types'

const initialState = {
    list: [],
    types: [
        {
            name: "Work",
            color: "#42AAFD",
        },
        {
            name: "Personal",
            color: "#01BACC",
        },
        {
            name: "Health",
            color: "#EE2375",
        },
        {
            name: 'Other',
            color: '#8539F9',
        },
        {
            name: "+",
            color: '#DEDEE5'
        }
    ],
    name: '',
    object: '',

}

const appointmentsReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_APPOINTMENT:
            return {
                ...state,
                list: action.payload
            }

        case SET_NAME: {
            return {
                ...state,
                name: action.payload
            }
        }
        case GET_TYPESEVENT:
            return {
                ...state,
                types: action.payload
            }
        case SET_OBJECT:
            return {
                ...state,
                object: action.payload
            }
        default:
            return state
    }

}

export default appointmentsReducers