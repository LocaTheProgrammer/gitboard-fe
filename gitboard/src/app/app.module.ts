import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './@pages/home/home.component';
import { NavbarComponent } from './@components/navbar/navbar.component';
import { LoginComponent } from './@pages/login/login.component';
import { PasswordForgottenComponent } from './@pages/password-forgotten/password-forgotten.component';
import { SignupComponent } from './@pages/signup/signup.component';
import { TodoListComponent } from './@pages/todo-list/todo-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SignUpSuccessfulComponent } from './@pages/sign-up-successful/sign-up-successful.component';
import { ConfirmResetComponent } from './@pages/confirm-reset/confirm-reset.component';
import { SpinnerComponent } from './@components/spinner/spinner.component';
import { AuthGuardService } from './@services/auth/AuthGuardService';
import { AuthInterceptor } from './@services/auth/AuthInterceptor';
import { AuthService } from './@services/auth/AuthService';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    PasswordForgottenComponent,
    TodoListComponent,
    SignUpSuccessfulComponent,
    ConfirmResetComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [ 
    AuthGuardService, 
    AuthService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
