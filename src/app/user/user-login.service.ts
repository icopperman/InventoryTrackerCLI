import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import * as _ from 'lodash';

import { IUserLogin } from './user';
import { MessageService } from '../messages/message.service';
import { SharedService } from '../shared/shared.service';


@Injectable()
export class UserLoginService {

    currentUser: IUserLogin;
    redirectUrl: string = '';

    // private baseUrl = 'http://webdev.nyp.org/InventoryTrackerSvc';
    private baseURL = ''; // 'http://localhost:58087';

    constructor(private http: Http,
        private messageService: MessageService, shared: SharedService) {

            this.baseURL = shared.baseURL + 'login';
         }

    isLoggedIn(): boolean {

        let rc: boolean = _.isEmpty(this.currentUser);

        return !rc ; // !!this.currentUser;

    }

    login(userName: string, password: string): Observable<IUserLogin> {

        //user.idUser = undefined;
        const url = this.baseURL; //`${this.baseUrl}/login`;
        console.log('post, login: ' + url);

       //userName = 'irc9012';
       //password = 'Word19nyh';

        if (!userName || !password) {

            this.messageService.addMessage('Please enter your userName and password');
            return;
        }

        let auser: any = { UserName: userName, Password: password };
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, auser, options)
            .map(this.extractData, this)
            .do(data => console.log('login: '))// + JSON.stringify(data)))
            .catch(this.handleError);
    }

    extractData = (response: Response) : IUserLogin => {

        let body = response.json();

        if (body.Status === 'error') {

            console.log(body.Status + ',' + body.ErrMsg);
            throw new Error('Server Error - ' + body.ErrMsg);
            //return Observable.throw('Server error - cwid not recognized');

        }

        let auser: IUserLogin = <IUserLogin>body;

        
            let userType: string = 'User';

            switch (auser.isAdmin) {

                case 'Y': userType = 'Admin'; break;
                case 'N': userType = 'User'; break;
                case 'X': userType = 'Non-Clinical'; break;
            }

            //if (_.isEmpty(auser.firstName) == true) auser.firstName = "";
            //if (_.isEmpty(auser.lastName) == true) auser.lastName = "";

            auser.isAdmin = userType;
            auser.preferredCampus = (auser.preferredCampus === 'E') ? 'East' : 'West';
            this.currentUser = auser;

            return auser;

    }

    private handleError(error: any): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.log(error);

        if (error instanceof Error) {
            return Observable.throw(error || 'Server error');

        }
        else {

            return Observable.throw('Server error');

        }

    }

    clogin(userName: string, password: string): void {

        if (!userName || !password) {

            this.messageService.addMessage('Please enter your userName and password');
            return;
        }



        this.messageService.addMessage(`User: ${this.currentUser.user} logged in`);

    }
    logout(): void {

        this.currentUser = null;

    }
    getUsers(): Observable<IUserLogin[]> {

        const url = this.baseURL;
        console.log('get, getUsers: ' + url);

        return this.http.get(this.baseURL)
            .map(this.extractData)
            .do(data => console.log('getUsers: '))// + JSON.stringify(data)))
            .catch(this.handleError);
    }
    // initializeUser(): IUser {
    //     // Return an initialized object
    //     return {
    //         // id: 0,
    //         // category: null,
    //         // tags: [],
    //         // releaseDate: null,
    //         // price: null,
    //         // description: null,
    //         // starRating: null,
    //         // imageUrl: null,
    //         // active: null, 
    //         //preferredCampus: null,
    //         //preferredCampus1: null,

    //         idUser: 0,
    //         //name: null,
    //         //site: null,
    //         userCwid: null,
    //         //userCode: null,
    //         firstName: null,
    //         lastName: null,
    //         preferredCampus: null,
    //         preferredUnit: null,
    //         isAdmin: null,
    //         createdDate: null


    //     };
    // }
}
 // if (userName === 'admin') {

        //     this.currentUser = {
        //         id: 1,
        //         userName: userName,
        //         isAdmin: true
        //     };

        //     this.messageService.addMessage('Admin login');
        //     return;

        // }

        // this.currentUser = {
        //     id: 2,
        //     userName: userName,
        //     isAdmin: false
        // };
    
    