import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmResetComponent } from './@pages/confirm-reset/confirm-reset.component';
import { HomeComponent } from './@pages/home/home.component';
import { LoginComponent } from './@pages/login/login.component';
import { PasswordForgottenComponent } from './@pages/password-forgotten/password-forgotten.component';
import { SignUpSuccessfulComponent } from './@pages/sign-up-successful/sign-up-successful.component';
import { SignupComponent } from './@pages/signup/signup.component';
import { TodoListComponent } from './@pages/todo-list/todo-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'password-forgotten', component: PasswordForgottenComponent },
  { path: 'todo-list', component: TodoListComponent },
  { path: 'sign-up-success', component: SignUpSuccessfulComponent },
  { path: 'confirm-reset', component: ConfirmResetComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
