import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
// import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import momentPlugin from '@fullcalendar/moment';
import { MomentModule } from 'ngx-moment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import {BaseCalendarComponent} from './components/baseCalendar/baseCalendar.component';
import {ViewCalendarComponent} from './components/viewCalendar/viewCalendar.component';
import {SmallCalendarComponent} from './components/smallCalendar/smallCalendar.component';
import {WeekCalendarComponent} from './components/weekCalendar/weekCalendar.component';
import {ImgPlaceholderComponent} from './components/imgPlaceholder.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import {appointmentReducer} from './state/appointment.reducer';
import {AppointmentCardComponent} from './components/appointmentCard/appointmentCard';
import {AppointmentModalComponent} from './components/appointmentModal/appointmentModal';

// @ts-ignore
import * as config from '../../config.js'; // const config = require('../../config.js');

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  momentPlugin
  // interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    ImgPlaceholderComponent,
    ViewCalendarComponent,
    BaseCalendarComponent,
    SmallCalendarComponent,
    WeekCalendarComponent,
    AppointmentCardComponent,
    AppointmentModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FullCalendarModule,
    MomentModule,
    StoreModule.forRoot({
      appointment: appointmentReducer
    }, {}),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: `http://localhost:${config.graphQl.port}`
          })
        };
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
