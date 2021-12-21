import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewCalendarComponent} from './components/viewCalendar/viewCalendar.component';

const routes: Routes = [
  {path: '', component: ViewCalendarComponent},
  {path: 'view/:date', component: ViewCalendarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
