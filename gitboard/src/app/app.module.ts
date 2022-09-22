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
import { AdminControlPanelComponent } from './@pages/admin-control-panel/admin-control-panel.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { DragNDropComponent } from './@components/drag-n-drop/drag-n-drop.component';
import { CommonModule } from '@angular/common';
import { CreateCompanyComponent } from './@components/create-company/create-company.component';
import { EditCompanyComponent } from './@components/edit-company/edit-company.component';
import { CreateTaskComponent } from './@components/create-task/create-task.component';



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
    SpinnerComponent,
    AdminControlPanelComponent,
    DragNDropComponent,
    CreateCompanyComponent,
    EditCompanyComponent,
    CreateTaskComponent
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
    DragDropModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule
  ],
  providers: [ 
    MatDatepickerModule,
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
