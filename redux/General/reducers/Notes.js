import { SET_NOTE } from '../actions/types'

const initialState = {
    note: ''

}

const noteReducers = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTE:
            return {
                ...state,
                note: action.payload
            }
        default:
            return state
    }

}

export default noteReducers