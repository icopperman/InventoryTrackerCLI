
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IUnit } from '../invUnits/unit';
import { UnitService } from '../invUnits/unit.service';

@Injectable()
export class EmailUnitsResolver implements Resolve<IUnit[]> {

    constructor(private unitService: UnitService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUnit[]> {

        return this.unitService.getUnits()
            .map(unit => {

                if (unit) { return unit; }

                console.log(`Units was not found`);
                this.router.navigate(['/emails']);
                
                return null;

            })
            .catch(error => {
                
                console.log(`Retrieval error: ${error}`);
                
                this.router.navigate(['/emails']);
                return Observable.of(null);
                
            });

    }
}
