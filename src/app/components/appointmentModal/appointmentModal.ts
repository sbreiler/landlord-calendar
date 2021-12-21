import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {State, Store} from '@ngrx/store';
import _ from 'lodash';
import {AppState, selectAppointments} from '../../state/app.state';
import {Appointment} from '../../models/Appointment';
import {Country} from '../../../shared-definitions/Address';
import {OptionalId} from '../../../shared-definitions/Id';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: 'appointmentModal.html'
})
export class AppointmentModalComponent implements OnChanges {
  @Input() appointment: Appointment|null = null;
  nextId: OptionalId = null;
  prevId: OptionalId = null;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>, private state: State<AppState>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (_.has(changes, ['appointment'])) {
      const currentId = _.get(changes, ['appointment', 'currentValue', 'id'], null);
      if ( _.isNil(currentId) ) {
        return;
      }
      const allAppointments = this.state.getValue().appointment.appointments;
      if ( _.isNil(allAppointments) ) {
        return;
      }

      const selectedAppointment = _.find<Appointment|undefined>(allAppointments, ['id', currentId]);
      if ( _.isNil(selectedAppointment) ) {
        return;
      }

      this.prevId = selectedAppointment.prev;
      this.nextId = selectedAppointment.next;
    }
  }

  public countryCode2countryName(input: string): string {
    switch (input) {
      case Country.DE:
        return 'Germany';
      default:
        return input;
    }
  }

  public close($event: Event): void {
    $event.preventDefault();

    this.router.navigate(
      [], // don't change current route path
      {
        relativeTo: this.route,
        queryParams: {}
      }
    );
  }

  public prevAppointment($event: Event): void {
    $event.preventDefault();
    if ( !_.isNil(this.prevId) ) {
      this.router.navigate(
        [], // don't change current route path
        {
          relativeTo: this.route,
          queryParams: {
            select: this.prevId
          }
        }
      );
    }
  }

  public nextAppointment($event: Event): void {
    $event.preventDefault();
    if ( !_.isNil(this.nextId) ) {
      this.router.navigate(
        [], // don't change current route path
        {
          relativeTo: this.route,
          queryParams: {
            select: this.nextId
          }
        }
      );
    }
  }
}
