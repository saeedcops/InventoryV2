import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users/users.component';
import { UsersAddEditComponent } from './users/users-add-edit/users-add-edit.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    UsersAddEditComponent
  ],

  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
