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
import { CollapsibleWellComponent } from './common/collapsible-well.component';
import { appRoutes } from './routes';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionListComponent } from './events/event-details/session-list.component';
import { TOASTR_TOKEN, Toastr } from './common/toastr.service';




declare let toastr: Toastr;

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
    DurationPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    EventService,
    { 
      provide: TOASTR_TOKEN,
      useValue: toastr
    },
    EventRouteActivator,
    EventListResolver,
    AuthService,
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
