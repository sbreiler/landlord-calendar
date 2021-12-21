import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {exhaustMap, map} from 'rxjs/operators';
import {Apollo} from 'apollo-angular';
import * as AppointmentActions from './state/appointment.actions';
import {getAppointmentDetail, getAppointments} from './app.queries';
import {parseGetAppointmentDetail, parseGetAppointments} from './helper';

@Injectable()
export class AppEffects {
  constructor(readonly apollo: Apollo, readonly actions$: Actions) {}

  getAppointments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppointmentActions.getAppointments),
      exhaustMap(({start, end}) =>
        this.apollo.query({
          query: getAppointments,
          variables: {
            start,
            end
          }
        })
          .pipe(
            map((response: any) =>
              AppointmentActions.getAppointmentsSuccess(
                parseGetAppointments(
                  response.data
                )
              )
            )
          )
      )
    );
  });

  getAppointmentDetail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppointmentActions.getAppointmentDetail),
      exhaustMap(({id}) => {
        return this.apollo.query({
          query: getAppointmentDetail,
          variables: {
            id
          }
        })
          .pipe(
            map((response: any) =>
              AppointmentActions.getAppointmentDetailSuccess(
                parseGetAppointmentDetail(
                  response.data
                )
              )
            )
          );
      })
    );
  });
}
