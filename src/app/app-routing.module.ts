import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './services/auth.guard';
const routes: Routes = [
  { path: '',component: HomeComponent},
  { path: 'events', component: EventsComponent },
  { path: 'events/:id', component: HomeComponent },
  { path: 'create-event', component: CreateEventComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
