import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';
import { UserEditComponent } from './user-edit.component';
import { UserEditInfoComponent } from './user-edit-info.component';
//import { UserEditTagsComponent } from './user-edit-tags.component';

import { UserFilterPipe } from './user-filter.pipe';
import { UserService } from './user.service';
import { UserResolver } from './user-resolver.service';
import { UserEditGuard } from './user-guard.service';

import { SharedModule } from '../shared/shared.module';
import { SharedService } from '../shared/shared.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserListComponent,
        data: { origin: 'from :, userListcomponent', idx: 0}
      },
      {
        path: ':id',
        component: UserDetailComponent,
        data: { origin: 'from :, userDetailcomponent', idx: 1},
        resolve: { user: UserResolver }
      },
      {
        path: ':id/edit',
        component: UserEditComponent,
        data: { origin: 'from :id/, userEditComponent', idx: 2},
        resolve: { user: UserResolver },
        canDeactivate: [UserEditGuard],
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full'
          },
          {
            path: 'info',
            component: UserEditInfoComponent
          }
          ,
          // {
          //   path: 'tags',
          //   component: UserEditTagsComponent
          // }
        ]
      }
    ])
  ],
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    UserEditInfoComponent,
    //UserEditTagsComponent,
    UserFilterPipe
  ],
  providers: [
    SharedService,
    UserService,
    UserResolver,
    UserEditGuard
  ]
})
export class UserModule { }
