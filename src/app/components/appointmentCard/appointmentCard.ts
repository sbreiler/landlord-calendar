import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Appointment} from '../../models/Appointment';
import {Country} from '../../../shared-definitions/Address';

@Component({
  selector: 'app-appointment-card',
  templateUrl: 'appointmentCard.html'
})
export class AppointmentCardComponent {
  @Input() appointment: Appointment|null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  public countryCode2countryName(input: string): string {
    switch (input) {
      case Country.DE:
        return 'Germany';
      default:
        return input;
    }
  }

  public clear($event: Event): void {
    $event.preventDefault();

    this.router.navigate(
      [], // don't change current route path
      {
        relativeTo: this.route,
        queryParams: {}
      }
    );
  }
}
