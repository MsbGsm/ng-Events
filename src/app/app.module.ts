import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  EventListComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventService,
  EventRouteActivator,
  EventListResolver, 
  CreateSessionComponent,
  DurationPipe} from './events/index';

import { EventAppComponent } from './event-app.component';
import { Error404Component } from './errors/404.component';
import { NavBarComponent } from './nav/navbar.component';
import { appRoutes } from './routes';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionListComponent } from './events/event-details/session-list.component';
import { TOASTR_TOKEN, Toastr, CollapsibleWellComponent, JQ_TOKEN, SimpleModalComponent, ModalTriggerDirective } from './common/index';




let toastr: Toastr = window['toastr'];
let jQuery = window['$'];

@NgModule({
  declarations: [
    EventAppComponent,
    EventListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    Error404Component,
    NavBarComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    EventService,
    EventRouteActivator,
    EventListResolver,
    AuthService,
    { 
      provide: TOASTR_TOKEN,
      useValue: toastr
    },
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    },
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }
  ],
  bootstrap: [EventAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?')
  }
  return true;
}
