import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './@pages/home/home.component';
import { LoginComponent } from './@pages/login/login.component';
import { PasswordForgottenComponent } from './@pages/password-forgotten/password-forgotten.component';
import { SignupComponent } from './@pages/signup/signup.component';
import { TodoListComponent } from './@pages/todo-list/todo-list.component';

import { SignUpSuccessfulComponent } from './@pages/sign-up-successful/sign-up-successful.component';
import { ConfirmResetComponent } from './@pages/confirm-reset/confirm-reset.component';
import { AuthGuardService } from './@services/auth/AuthGuardService';
import { AuthInterceptor } from './@services/auth/AuthInterceptor';
import { AuthService } from './@services/auth/AuthService';
import { AdminControlPanelComponent } from './@pages/admin-control-panel/admin-control-panel.component';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './@pages/project-list/project-list.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './data.service';
import { TodoListCloneComponent } from './@pages/mock/todo-list-clone/todo-list-clone.component';
import { ComponentPagesShared } from './@components/component-pages-shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DragNDropComponent } from './@components/drag-n-drop/drag-n-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragNDropColoneComponent } from './@components/mock/drag-n-drop-colone/drag-n-drop-colone.component';
import { SubTaskListComponent } from './@pages/sub-task-list/sub-task-list.component';



@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    HomeComponent,
    SignupComponent,
    PasswordForgottenComponent,
    TodoListComponent,
    SubTaskListComponent,
    SignUpSuccessfulComponent,
    ConfirmResetComponent,
    TodoListCloneComponent,
    AdminControlPanelComponent,
    ProjectListComponent,
    DragNDropComponent,
    DragNDropColoneComponent,
  ],
  imports: [
    DragDropModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ComponentPagesShared,
    //mock api
    HttpClientInMemoryWebApiModule.forRoot(DataService, {
      rootPath: 'api/',
      passThruUnknownUrl: true
    })
  ],
  providers: [
    MatDatepickerModule,
    AuthGuardService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
