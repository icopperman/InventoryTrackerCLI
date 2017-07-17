import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { ITablet } from './tablet';

@Injectable()
export class TabletService {
    
    private baseUrl = 'http://webdev.nyp.org/InventoryTrackerSvc/tablets';

    constructor(private http: Http) { }

    getTablets(): Observable<ITablet[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(data => console.log('getTablets: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getTablet(id: number): Observable<ITablet> {
        if (id === 0) {
            return Observable.of(this.initializeTablet());
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getTablet: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteTablet(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteTablet: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveTablet(tablet: ITablet): Observable<ITablet> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (tablet.tblIdx === 0) {
            return this.createTablet(tablet, options);
        }
        return this.updateTablet(tablet, options);
    }

    private createTablet(tablet: ITablet, options: RequestOptions): Observable<ITablet> {
        tablet.tblIdx = undefined;
        return this.http.post(this.baseUrl, tablet, options)
            .map(this.extractData)
            .do(data => console.log('createtablet: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateTablet(tablet: ITablet, options: RequestOptions): Observable<ITablet> {
        const url = `${this.baseUrl}/${tablet.tblIdx}`;
        return this.http.put(url, tablet, options)
            .map(() => tablet)
            .do(data => console.log('updateTablet: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
         let xx = body.Tablets;

        if ( xx.length === 1) {
            return xx[0];
        }
        else {
            return xx || {};
        }
        
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeTablet(): ITablet {
        // Return an initialized object
        return {
            // id: 0,
            // category: null,
            // tags: [],
            // releaseDate: null,
            // price: null,
            // description: null,
            // starRating: null,
            // imageUrl: null,
            // active: null, 
            // campus1: null,
            // createdDate: null,
            // name: null,
            // site: null,
            // tabletCode: null,
            
            Campus: null,
            tblIdx: 0,
            TabletName: null,
            Unit: null, 
            Status: null,
            selectedUnit: null

        };
    }
}
