
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IEmail } from './email';
import { EmailService } from './email.service';

@Injectable()
export class EmailResolver implements Resolve<IEmail[]> {

    constructor(private emailService: EmailService,  private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmail[]> {

        let xx = route.data;

        switch (xx.idx) {
            
            case 0:
                console.log(xx.origin);
                return this.emailService.getEmails()
                    .map(emails => {
                        if ( emails) {
                            return emails;
                        }
                        this.router.navigate(['/home']);
                        return null;
                    })
                    .catch( error => {
                        console.log(`Retrieval error: ${error}`);
                        this.router.navigate(['/emails']);
                        return Observable.of(null);
                    });

            case 1:
            case 2:
                console.log(xx.origin);
                let id = route.params['id'];
                // let id = route.paramMap.get('id');
                if (isNaN(+id)) {
                    console.log(`Email id was not a number: ${id}`);
                    this.router.navigate(['/emails']);
                    return Observable.of(null);
                }
                
                return this.emailService.getEmail(+id)
                    .map(email => {
                        if (email) {
                            return email;
                        }
                        console.log(`Email was not found: ${id}`);
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
}
