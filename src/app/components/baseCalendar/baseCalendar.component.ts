import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CalendarOptions, FullCalendarComponent} from '@fullcalendar/angular';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import moment from 'moment';
import _ from 'lodash';
import {Appointment} from '../../models/Appointment';

@Component({
  selector: 'app-base-calendar',
  templateUrl: './baseCalendar.component.html'
})
export class BaseCalendarComponent implements OnChanges /*implements OnInit*/ {
  @Input() viewDate: Date = moment().toDate();
  @Output() changeDate: EventEmitter<void> = new EventEmitter<void>();
  calendarOptions: CalendarOptions;
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  @Input() appointments: Appointment[]|null = null;

  constructor() {
    this.calendarOptions = {
      events: this.parseAppointments2Events(this.appointments),
      plugins: [bootstrapPlugin],
      initialView: 'dayGridMonth',
      initialDate: this.viewDate,
      themeSystem: 'bootstrap',
      height: 'auto',
      // dayHeaderFormat: { weekday: 'short' },
      headerToolbar: false,  // start: 'title', center: '', end: 'prev,next' // today is possible too
      dayHeaderContent: ({date}) => {
        return _.first(moment(date)
          .format('dd'));
      }
/*
      select: (...args) => {
        console.log('select', args);
      },
      datesSet: (...args) => {
        console.log('datesSet', args);
      }
 */
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (_.has(changes, ['viewDate', 'currentValue'])) {
      this.gotoCurrentDate();
    }

    if (_.has(changes, ['appointments', 'currentValue'])) {
      this.calendarOptions.events = this.parseAppointments2Events(this.appointments);
    }
  }

  protected gotoCurrentDate(): void {
    if ( _.isNil(this.calendarComponent) ) {
      // dirty!!!! but seems to work for now :-/
      // Problem: navigation is finished / we get new data from store, but calendar isn't ready
      console.log('!!gotoCurrentDate', this.viewDate.toLocaleString());
      setTimeout(() => {
        // try later...
        this.gotoCurrentDate();
      }, 150);

      return;
    }

    console.log('gotoCurrentDate', this.viewDate.toLocaleString());
    this.calendarComponent.getApi()
      .gotoDate(this.viewDate);

    this.changeDate.emit();
  }

  protected parseAppointments2Events(appointments: Appointment[]|null): any[] {
    if (_.isNil(appointments)) {
      return [];
    }

    return _.map(appointments, (appointment: Appointment) => ({
      id: appointment.id,
      title: appointment.property.name,
      start: appointment.date
    }));
  }
}
