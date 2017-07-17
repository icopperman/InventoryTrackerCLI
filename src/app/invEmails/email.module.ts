import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmailListComponent } from './email-list.component';
import { EmailDetailComponent } from './email-detail.component';
import { EmailEditComponent } from './email-edit.component';
import { EmailEditInfoComponent } from './email-edit-info.component';
//import { EmailEditTagsComponent } from './email-edit-tags.component';

import { UnitService } from '../invUnits/unit.service';
import { EmailService } from './email.service';
import { EmailResolver } from './email-resolver.service';
import { EmailUnitsResolver } from './email-units-resolver.service';
import { EmailFilterPipe } from './email-filter.pipe';
import { EmailEditGuard } from './email-guard.service';

import { SharedModule } from '../shared/shared.module';
import { SharedService } from '../shared/shared.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmailListComponent,
        resolve: { emails: EmailResolver },
        data: { origin: 'from :, emailListcomponent', idx: 0 }
      },
      {
        path: ':id',
        component: EmailDetailComponent,
        resolve: { emails: EmailResolver },

        data: { origin: 'from :id, emaildetailcomponent', idx: 1 }
      },
      {
        path: ':id/edit',
        component: EmailEditComponent,
        resolve: {
          emails: EmailResolver,
          units: EmailUnitsResolver
        },
        data: { origin: 'from :id/edit, emaileditcomponent', idx: 2 },
        canDeactivate: [EmailEditGuard],
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full'
          },
          {
            path: 'info',
            component: EmailEditInfoComponent
          }
          // ,
          // {
          //   path: 'tags',
          //   component: EmailEditTagsComponent
          // }
        ]
      }
    ])
  ],
  declarations: [
    EmailListComponent,
    EmailDetailComponent,
    EmailEditComponent,
    EmailEditInfoComponent,
    //EmailEditTagsComponent,
    EmailFilterPipe
  ],
  providers: [
    SharedService,
    EmailService,
    EmailEditGuard,
    EmailResolver,
    EmailUnitsResolver,
    UnitService
  ]
})
export class EmailModule { }
