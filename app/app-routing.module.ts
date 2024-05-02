import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { MemberRegistrationComponent } from './member-registration/member-registration.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login/admin-login.component';
import { AdminCrmComponent } from './admin/admin-CRM/admin-crm/admin-crm.component';
import { AdminCmsComponent } from './admin/admin-CMS/admin-cms/admin-cms.component';
import { AccountManagementComponent } from './admin/account-management/account-management/account-management.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "admin", component: AdminComponent
  },
  {
    path: "admin-login", component: AdminLoginComponent
  },
  {
    path: "account-management", component: AccountManagementComponent
  },
  {
    path: "admin-crm", component: AdminCrmComponent
  },
  {
    path: "admin-cms", component: AdminCmsComponent
  },
  {
    path: "reg", component: MemberRegistrationComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
