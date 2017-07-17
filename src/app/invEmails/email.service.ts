import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IEmail } from './email';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class EmailService {
    // tslint:disable-next-line:no-trailing-whitespace

    private baseUrl = ''; // http://webdev.nyp.org/InventoryTrackerSvc/email';

    constructor(private http: Http, shared: SharedService) {

        this.baseUrl = shared.baseURL + 'email';
    }

    getEmails(): Observable<IEmail[]> {
        
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(data => console.log('getEmails: ' + JSON.stringify(data)))
            .catch(this.handleError);
    
    }

    getEmail(id: number): Observable<IEmail[]> {

        if (id === 0) {
            return Observable.of(this.initializeEmail());
        }

        const url = `${this.baseUrl}/${id}`;

        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getEmail: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveEmail(email: IEmail): Observable<IEmail> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (email.tblIdx === 0) {
            return this.createEmail(email, options);
        }

        return this.updateEmail(email, options);
    }

    private createEmail(email: IEmail, options: RequestOptions): Observable<IEmail> {

        email.tblIdx = undefined;

        return this.http.post(this.baseUrl, email, options)
            .map(this.extractData)
            .do(data => console.log('createemail: ' + JSON.stringify(data)))
            .catch(this.handleError);

    }

    private updateEmail(email: IEmail, options: RequestOptions): Observable<IEmail> {

        const url = `${this.baseUrl}/${email.tblIdx}`;

        return this.http.put(url, email, options)
            .map(() => email)
            .do(data => console.log('updateEmail: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {

        let body = response.json();
        let xx = body.EmailAddresses;

        //let yy = (xx.length === 1) ? xx[0] : xx || {};

        return xx;

    }

    private handleError(error: Response): Observable<any> {

        console.log(error);

        return Observable.throw(error.json().error || 'Server error');

    }

    deleteEmail(id: number): Observable<Response> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;

        return this.http.delete(url, options)
            .do(data => console.log('deleteEmail: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    initializeEmail(): IEmail[] {

        return [ {
            tblIdx: 0,
            Campus: null,
            Unit: null,
            EmailAddress: null,
            Units: null,
            selectedUnit: null
        }]  ;
    }
}
