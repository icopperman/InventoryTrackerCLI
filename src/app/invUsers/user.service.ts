import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import * as _ from 'lodash';

import { IUser } from './user';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class UserService {

    private baseUrl = 'http://webdev.nyp.org/InventoryTrackerSvc/users';
    // private baseUrl = 'http://localhost:58087/users';
    // tslint:disable-next-line:no-trailing-whitespace
    
    constructor(private http: Http, shared: SharedService) {

        this.baseUrl = shared.baseURL + 'users';
     }

    getUsers(): Observable<IUser[]> {

        const url = this.baseUrl;
        console.log('get, getUsers: ' + url);

        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(data => console.log('getUsers: '))// + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getUser(id: number): Observable<IUser> {

        if (id === 0) {
            return Observable.of(this.initializeUser());
        };

        const url = `${this.baseUrl}/${id}`;
        console.log('get, getUser: ' + url);

        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getUser: '))// + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteUser(id: number): Observable<Response> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        console.log('delete, deleteUsers: ' + url);

        return this.http.delete(url, options)
            .do(data => console.log('deleteUser: '))// + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveUser(user: IUser): Observable<IUser> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let userType: string = '';

        switch (user.isAdmin) {

            case 'Admin': userType = 'Y'; break;
            case 'User': userType = 'N'; break;
            case 'Non-Clinical': userType = 'X'; break;
        }

        if (user.idUser === 0) {

            return this.createUser(user, options);

        }

        return this.updateUser(user, options);
    }

    private createUser(user: IUser, options: RequestOptions): Observable<IUser> {

        // user.idUser = undefined;
        const url = `${this.baseUrl}/add`;
        console.log('post, addUser: ' + url);

        return this.http.post(this.baseUrl, user, options)
            .map(this.extractData)
            .do(data => console.log('createuser: '))// + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateUser(user: IUser, options: RequestOptions): Observable<IUser> {

        const url = `${this.baseUrl}/${user.idUser}/update`;
        console.log('post, updateUser: ' + url);

        if (user.preferredCampus.length > 1) {

            user.preferredCampus = (user.preferredCampus === 'East') ? 'E' : 'W';

        }

        return this.http.put(url, user, options)
            .map(() => user)
            .do(data => console.log('updateUser: '))// + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {

        let body = response.json();

        if ( body.Status === 'error') {

               console.log(body.Status + ',' + body.ErrMsg);
               throw new Error('Server Error - ' + body.ErrMsg);
               // return Observable.throw('Server error - cwid not recognized');

        }

        let xx = body.Users;

        xx = _.map(xx, (auser: IUser) => {

            // tslint:disable-next-line:no-inferrable-types
            let userType: string = 'User';
            switch (auser.isAdmin) {

                case 'Y': userType = 'Admin'; break;
                case 'N': userType = 'User'; break;
                case 'X': userType = 'Non-Clinical'; break;
            }

            if (_.isEmpty(auser.firstName) === true) auser.firstName = '';
            if (_.isEmpty(auser.lastName) === true) auser.lastName = '';

            auser.isAdmin = userType;
            auser.preferredCampus = (auser.preferredCampus === 'E') ? 'East' : 'West';

            return auser;

        });

        if (xx.length === 1) {
            return xx[0];
        }
        else {
            return xx || {};
        }

    }

    private handleError(error: any): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.log(error);

        if ( error instanceof Error) {
            return Observable.throw(error || 'Server error');

        }
        else {
            
            return Observable.throw(error.json().error || 'Server error');

        }
         
    }

    initializeUser(): IUser {
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
            // preferredCampus: null,
            // preferredCampus1: null,

            idUser: 0,
            // name: null,
            // site: null,
            userCwid: null,
            // userCode: null,
            firstName: null,
            lastName: null,
            preferredCampus: null,
            preferredUnit: null,
            isAdmin: null,
            createdDate: null


        };
    }
}
