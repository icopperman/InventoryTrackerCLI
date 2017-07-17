import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { UserLoginService } from './user-login.service';
//import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';

import { SharedModule } from '../shared/shared.module';
import { SharedService } from '../shared/shared.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent }
    ])
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    SharedService,
    //AuthService,
    AuthGuard,
    UserLoginService
  ]
})
export class UserModule { }
