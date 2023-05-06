import * as actions from "./types"


export const setNote = (data) => (dispatch) => {
    dispatch({
        type: actions.SET_NOTE,
        payload: data
    })
}