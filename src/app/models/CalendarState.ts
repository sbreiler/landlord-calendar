import {Appointment} from './Appointment';

export interface CalendarState {
  date: Date;
  appointments: Appointment[];
}
