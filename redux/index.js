import {combineReducers} from 'redux';
import appointmentReducers from './General/reducers/AppointmentsReducers';
import noteReducers from './General/reducers/Notes'
const rootReducer = combineReducers({
  appointment: appointmentReducers,
  notes:noteReducers
})
export default rootReducer