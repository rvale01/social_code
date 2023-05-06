import * as actions from "./types"

export const getAppointment =  (data) => (dispatch) => {
    dispatch({
        type: actions.GET_APPOINTMENT,
        payload: data
    })
}

export const setName = (data) => (dispatch) => {
    dispatch({
        type: actions.SET_NAME,
        payload: data
    })
}

export const getTypesEvent = (data) => (dispatch) => {
    dispatch({
        type: actions.GET_TYPESEVENT,
        payload: data
    })
}

export const setObject = (data) => (dispatch) => {
    dispatch({
        type: actions.SET_OBJECT,
        payload: data
    })
}