import { createReducer, on } from '@ngrx/store';
import _ from 'lodash';
import * as appointmentActions from './appointment.actions';
import {Appointment} from '../models/Appointment';
import * as moment from "moment";
import {last} from "rxjs/operators";

export interface AppointmentState {
  selectedAppointment: Appointment | null;
  prevAppointment: Appointment | null;
  nextAppointment: Appointment | null;
  appointments: Appointment[];
}

const initialState: AppointmentState = {
  selectedAppointment: null,
  prevAppointment: null,
  nextAppointment: null,
  appointments: []
};

export const selectedAppointment = (state: AppointmentState): Appointment|null => state.selectedAppointment;

export const appointments = (state: AppointmentState): Appointment[] => state.appointments;

export const appointmentReducer = createReducer(
  initialState,
  on(appointmentActions.getAppointmentDetailSuccess, (state: AppointmentState, {appointment}) =>
    _.merge({}, state, {selectedAppointment: appointment})
  ),
  on(appointmentActions.clearAppointmentDetail, (state: AppointmentState) =>
    _.merge({}, state, {selectedAppointment: null})
  ),
  on(appointmentActions.getAppointmentsSuccess, (state: AppointmentState, {appointmentList}) => {
    return ({...state, appointments: appointmentList});
  })
);
