import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './user/auth-guard.service';
import { SelectiveStrategy } from './selective-strategy.service';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            {
                path: 'units',
                canActivate: [AuthGuard],
                data: { preload: true, source: 'getunits' },
                loadChildren: 'app/invUnits/unit.module#UnitModule'
            },
            {
                path: 'users',
                canActivate: [AuthGuard],
                data: { preload: true, source: 'getusers' },
                loadChildren: 'app/invUsers/user.module#UserModule'
            },
            {
                path: 'tablets',
                canActivate: [AuthGuard],
                data: { preload: true, source: 'gettablets' },
                loadChildren: 'app/invTablets/tablet.module#TabletModule'
            },
            {
                path: 'emails',
                canActivate: [AuthGuard],
                data: { preload: true, source: 'getemails' },
                loadChildren: 'app/invEmails/email.module#EmailModule'
            },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }

        ],
            { preloadingStrategy: SelectiveStrategy })
        // , { enableTracing: true })
    ],
    providers: [SelectiveStrategy],
    exports: [RouterModule]
})
export class AppRoutingModule { }
