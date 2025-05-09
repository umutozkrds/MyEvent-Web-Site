import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { CreateEventComponent } from './create-event/create-event.component';
const routes: Routes = [
  { path: '',component: HomeComponent},
  { path: 'events', component: EventsComponent },
  { path: 'events/:id', component: HomeComponent },
  { path: 'create-event', component: CreateEventComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
