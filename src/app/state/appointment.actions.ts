import {createAction, props} from '@ngrx/store';
import {Id} from '../../shared-definitions/Id';
import {Appointment} from '../models/Appointment';

const PREFIX = '[APPOINTMENT_ACTION]';

export const getAppointments = createAction(
  `${PREFIX}GET_APPOINTMENTS`,
  props<{start: Date, end: Date}>()
);

export const getAppointmentsSuccess = createAction(
  `${PREFIX}GET_APPOINTMENTS_SUCCESS`,
  (data: any): any => {
    return {appointmentList: data};
  }
);
export const getAppointmentDetail = createAction(
  `${PREFIX}GET_APPOINTMENT_DETAIL`,
  props<{id: Id}>()
);

export const getAppointmentDetailSuccess = createAction(
  `${PREFIX}GET_APPOINTMENT_DETAIL_SUCCESS`,
  (appointment: Appointment|null): any => {
    return {appointment};
  }
);

export const clearAppointmentDetail = createAction(
  `${PREFIX}CLEAR_APPOINTMENT_DETAIL`
);
