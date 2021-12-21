import _ from 'lodash';
import {Appointment} from './models/Appointment';

export const parseGetAppointments = ({appointments}: {appointments: any}): Appointment[] => {
  // make a "linked list"
  const orderList = _.orderBy(appointments, 'date');
  for (let i = 0; i < orderList.length; i++) {
    const next = (i + 1 < orderList.length) ? orderList[i + 1].id : null;
    const prev = (i > 0) ? orderList[i - 1].id : null;

    orderList[i] = _.merge({}, orderList[i], {
      next,
      prev
    });
  }

  return orderList as Appointment[];
};

export const parseGetAppointmentDetail = ({appointment}: {appointment: any}): Appointment|null =>
  appointment as Appointment;
