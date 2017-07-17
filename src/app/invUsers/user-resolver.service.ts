import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IUser } from './user';
import { UserService } from './user.service';

@Injectable()
export class UserResolver implements Resolve<IUser> {

    constructor(private userService: UserService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<IUser> {

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
                    console.log(`User id was not a number: ${id}`);
                    this.router.navigate(['/users']);
                    return Observable.of(null);
                }
                return this.userService.getUser(+id)
                    .map(user => {
                        if (user) {
                            return user;
                        }
                        console.log(`User was not found: ${id}`);
                        this.router.navigate(['/users']);
                        return null;
                    })
                    .catch(error => {
                        console.log(`Retrieval error: ${error}`);
                        this.router.navigate(['/products']);
                        return Observable.of(null);
                    });
        }
    }
}
