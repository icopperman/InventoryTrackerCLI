import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { ITablet } from './tablet';
import { TabletService } from './tablet.service';

@Injectable()
export class TabletResolver implements Resolve<ITablet> {

    constructor(private tabletService: TabletService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<ITablet> {

        // let id = route.paramMap.get('id');
        let xx: any = route.data;

        switch (xx.idx) {
            case 0:
                console.log(xx.origin);
                break;

            case 1:
            case 2:
                let id = route.params['id'];
                if (isNaN(+id)) {
                    console.log(`Tablet id was not a number: ${id}`);
                    this.router.navigate(['/tablets']);
                    return Observable.of(null);
                }
                return this.tabletService.getTablet(+id)
                    .map(tablet => {
                        if (tablet) {
                            return tablet;
                        }
                        console.log(`Tablet was not found: ${id}`);
                        this.router.navigate(['/tablets']);
                        return null;
                    })
                    .catch(error => {
                        console.log(`Retrieval error: ${error}`);
                        this.router.navigate(['/tablets']);
                        return Observable.of(null);
                    });
        }
    }
}
