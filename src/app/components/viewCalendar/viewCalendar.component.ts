import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import moment, {Moment} from 'moment';
import _ from 'lodash';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState, selectAppointments, selectSelectedAppointment} from '../../state/app.state';
import * as AppointmentActions from '../../state/appointment.actions';
import {Appointment} from '../../models/Appointment';

@Component({
  selector: 'app-view-calendar',
  templateUrl: 'viewCalendar.component.html'
})
export class ViewCalendarComponent implements OnInit {
  viewDate: Date = moment().toDate();
  selectedAppointment$: Observable<Appointment|null>;
  appointments$: Observable<Appointment[]>;
  nextViewing: Appointment|null = null;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) {
    this.setViewDateFromParams(route.snapshot.params);
    this.selectedAppointment$ = store.select(selectSelectedAppointment);
    this.appointments$ = store.select(selectAppointments);

    this.appointments$.subscribe(
      (appointments: Appointment[]) => this.showNextViewing(appointments)
    );

    route.queryParams.subscribe(
      (queryParams: Params) => {
        if ( _.has(queryParams, 'select') ) {
          const id = _.toNumber(queryParams.select);
          if ( id > 0 ) {
            store.dispatch(AppointmentActions.getAppointmentDetail({id}));
            return;
          }
        }

        store.dispatch(AppointmentActions.clearAppointmentDetail());
      }
    );

    route.params.subscribe(
      (params: Params) => {
        const routeDate = moment(params.date);
        // console.log('route params changed', routeDate);

        store.dispatch(AppointmentActions.getAppointments({
          start: routeDate.startOf('month').toDate(),
          end: routeDate.endOf('month').toDate()
        }));
      }
    );
  }

  protected parseInputDate(input: string): Date | null {
    try {
      return moment(input).toDate();
    }catch (e) {}

    return null;
  }

  protected setViewDateFromParams(params: Params): void {
    if ( _.has(params, 'date') ) {
      this.viewDate = this.parseInputDate(params.date) || moment().toDate();
    }
    else {
      this.viewDate = moment().toDate();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.setViewDateFromParams(params);
    });
  }

  protected navigate(toMoment: Moment): void {
    this.router.navigate(['view', toMoment.format('YYYY-MM-DD')]);
  }

  public prevMonth($event: Event): void {
    $event.preventDefault();

    this.navigate(
      moment(this.viewDate).subtract(1, 'M')
    );
  }

  public nextMonth($event: Event): void {
    $event.preventDefault();

    this.navigate(
      moment(this.viewDate).add(1, 'M')
    );
  }

  public prevWeek($event: Event): void {
    $event.preventDefault();

    this.navigate(
      moment(this.viewDate).subtract(1, 'w')
    );
  }

  public nextWeek($event: Event): void {
    $event.preventDefault();

    this.navigate(
      moment(this.viewDate).add(1, 'w')
    );
  }

  public outputWeek(): string {
    const startOfWeek = moment(this.viewDate).startOf('week');
    const endOfWeek = startOfWeek.clone().endOf('week'); // .add(1, 'd');

    if ( startOfWeek.month() !== endOfWeek.month() ) {
      if ( startOfWeek.year() !== endOfWeek.year() ) {
        // show month and year of both dates!
        return `${startOfWeek.format('D MMMM YYYY')} - ${endOfWeek.format('D MMMM YYYY')}`;
      }
      else {
        // show month of both dates
        return `${startOfWeek.format('D MMMM')} - ${endOfWeek.format('D MMMM YYYY')}`;
      }
    }

    return `${startOfWeek.format('D')} - ${endOfWeek.format('D MMMM YYYY')}`;
  }

  protected showNextViewing(appointments: Appointment[]): void {
    const now = moment().subtract(1, 'h');
    const nowOrFutureViewingsSorted = _.sortBy(
      _.filter(appointments, (appointment) => moment(appointment.date).isAfter(now)),
      'date'
    );

    if (nowOrFutureViewingsSorted.length > 0) {
      this.nextViewing = _.head(nowOrFutureViewingsSorted) ?? null;
      return;
    }

    this.nextViewing = null;
  }
}
