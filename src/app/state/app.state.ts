import {createSelector} from '@ngrx/store';
import {AppointmentState, selectedAppointment, appointments} from './appointment.reducer';

export interface AppState {
  appointment: AppointmentState;
}

export const selectAppointmentState = (state: AppState) => state.appointment;
export const selectSelectedAppointment = createSelector(
  selectAppointmentState,
  selectedAppointment
);
export const selectAppointments = createSelector(
  selectAppointmentState,
  appointments
);
