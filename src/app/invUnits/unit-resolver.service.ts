import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IUnit } from './unit';
import { UnitService } from './unit.service';

@Injectable()
export class UnitResolver implements Resolve<IUnit> {

    constructor(private unitService: UnitService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<IUnit> {

        let id = route.params['id'];
        // let id = route.paramMap.get('id');
        let xx: any = route.data;

        switch (xx.idx) {
            case 0:
                console.log(xx.origin);
                break;

            case 1:
            case 2:

                if (isNaN(+id)) {
                    console.log(`Unit id was not a number: ${id}`);
                    this.router.navigate(['/units']);
                    return Observable.of(null);
                }
                return this.unitService.getUnit(+id)
                    .map(unit => {
                        if (unit) {
                            return unit;
                        }
                        console.log(`Unit was not found: ${id}`);
                        this.router.navigate(['/units']);
                        return null;
                    })
                    .catch(error => {
                        console.log(`Retrieval error: ${error}`);
                        this.router.navigate(['/units']);
                        return Observable.of(null);
                    });
        }
    }
}
