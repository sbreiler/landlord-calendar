import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {State, Store} from '@ngrx/store';
import timeGridPlugin from '@fullcalendar/timegrid';
import _ from 'lodash';
import * as moment from 'moment';
import {BaseCalendarComponent} from '../baseCalendar/baseCalendar.component';
import {AppState} from '../../state/app.state';

@Component({
  selector: 'app-week-calendar',
  templateUrl: '../baseCalendar/baseCalendar.component.html'
})
export class WeekCalendarComponent extends BaseCalendarComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
    super();

    this.calendarOptions.plugins = [...this.calendarOptions.plugins || [], timeGridPlugin];
    this.calendarOptions.initialView = 'timeGridWeek';
    this.calendarOptions.dayHeaderContent = ({date}) => {
      return _.toUpper(
        moment(date)
          .format('D ddd')
      );
    };
    this.calendarOptions.allDaySlot = false;
    this.calendarOptions.slotMinTime = '08:00:00';
    this.calendarOptions.slotMaxTime = '20:00:00';
    this.calendarOptions.slotDuration = '01:00:00';
    this.calendarOptions.nowIndicator = true;
    this.calendarOptions.slotLabelContent = ({date}) => {
      return moment(date).format('H:mm');
    };
    this.calendarOptions.eventTimeFormat = 'H:mm';
    this.calendarOptions.eventClick = ({event}) => {
      this.router.navigate(
        [], // don't change current route path
        {
          relativeTo: this.route,
          queryParams: {
            select: event.id
          }
        }
      );
    };
  }
}
