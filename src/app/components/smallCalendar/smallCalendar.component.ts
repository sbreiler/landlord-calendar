import {Component, OnChanges, OnInit, AfterViewInit, SimpleChanges} from '@angular/core';
import {BaseCalendarComponent} from '../baseCalendar/baseCalendar.component';
import _ from 'lodash';
import moment from 'moment';
import {DayCellContentArg} from '@fullcalendar/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-small-calendar',
  templateUrl: '../baseCalendar/baseCalendar.component.html'
})
export class SmallCalendarComponent extends BaseCalendarComponent implements OnChanges, AfterViewInit {
  constructor(private router: Router) {
    super();

    this.calendarOptions.eventContent = ''; // don't ever show an event text inside small calendar
    this.calendarOptions.dayCellContent = (args: DayCellContentArg) => {
      return moment(args.date).format('D');
    };
    this.calendarOptions.dayCellDidMount = ({el, date}: DayCellContentArg) => {
      el.onclick = (event: MouseEvent) => {
        this.router.navigate(
          [
            'view',
            moment(date).format('YYYY-MM-DD')
          ]
        );

        // console.log('cell clicked', event, date);
      };
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if (_.has(changes, ['viewDate', 'currentValue'])) {
      this.selectWholeWeek(changes.viewDate.currentValue);
    }
  }

  ngAfterViewInit(): void {
    this.selectWholeWeek(this.viewDate);
  }

  protected selectWholeWeek(ofDate: string|Date): void {
    if ( _.isNil(this.calendarComponent) ) {
      return;
    }

    const mmnt = moment(ofDate);
    this.calendarComponent.getApi()
      .select(
        mmnt.startOf('week').toDate(),
        mmnt.endOf('week').add(1, 'd').toDate()
      );
  }
}
