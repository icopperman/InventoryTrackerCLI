import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TabletListComponent } from './tablet-list.component';
import { TabletDetailComponent } from './tablet-detail.component';
import { TabletEditComponent } from './tablet-edit.component';
import { TabletEditInfoComponent } from './tablet-edit-info.component';
//import { TabletEditTagsComponent } from './tablet-edit-tags.component';
import { UnitService } from '../invUnits/unit.service';

import { TabletService } from './tablet.service';
import { TabletResolver } from './tablet-resolver.service';
import { TabletUnitsResolver} from './tablet-units-resolver.service';
import { TabletFilterPipe } from './tablet-filter.pipe';
import { TabletEditGuard } from './tablet-guard.service';

import { SharedModule } from '../shared/shared.module';
import { SharedService } from '../shared/shared.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TabletListComponent,
        //resolve: { tablets: TabletResolver },
        data: { origin: 'from :, tabletListcomponent', idx: 0}

      },
      {
        path: ':id',
        component: TabletDetailComponent,
        data: { origin: 'from :id, tabletDetailcomponent', idx: 1},
        resolve: { tablet: TabletResolver }
      },
      {
        path: ':id/edit',
        component: TabletEditComponent,
        resolve: { tablet: TabletResolver,
                   units: TabletUnitsResolver   },
        data: { origin: 'from :id/edit, tabletEditcomponent', idx: 2},
        canDeactivate: [TabletEditGuard],
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full'
          },
          {
            path: 'info',
            component: TabletEditInfoComponent
          }
          //,
          // {
          //   path: 'tags',
          //   component: TabletEditTagsComponent
          // }
        ]
      }
    ])
  ],
  declarations: [
    TabletListComponent,
    TabletDetailComponent,
    TabletEditComponent,
    TabletEditInfoComponent,
    //TabletEditTagsComponent,
    TabletFilterPipe
  ],
  providers: [
    SharedService,
    TabletService,
    TabletResolver,
    TabletUnitsResolver,
    UnitService,
    TabletEditGuard
  ]
})
export class TabletModule { }
