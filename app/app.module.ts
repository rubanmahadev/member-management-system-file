import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MemberRegistrationComponent } from './member-registration/member-registration.component';
import { DatePipe } from '@angular/common';
import { AdminLoginComponent } from './admin/admin-login/admin-login/admin-login.component';
import { AdminCmsComponent } from './admin/admin-CMS/admin-cms/admin-cms.component';
import { AdminCrmComponent } from './admin/admin-CRM/admin-crm/admin-crm.component';
import { AccountManagementComponent } from './admin/account-management/account-management/account-management.component';
// import { AdminLoginComponent } from './admin-login/admin-login/admin-login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    MemberRegistrationComponent,
    AdminLoginComponent,
    AdminCmsComponent,
    AdminCrmComponent,
    AccountManagementComponent,
    // AdminLoginComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
