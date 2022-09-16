import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './src/app/@pages/home/home.component';
import { LoginComponent } from './src/app/@pages/login/login.component';
import { PasswordForgottenComponent } from './src/app/@pages/password-forgotten/password-forgotten.component';
import { SignupComponent } from './src/app/@pages/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'password-forgotten', component: PasswordForgottenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
