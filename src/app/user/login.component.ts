import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// import { AuthService } from './auth.service';
import { UserLoginService } from './user-login.service';
import { IUserLogin } from './user';
import * as _ from 'lodash';

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent {

    errorMessage: string;
    pageTitle = 'Log In';
    userName = 'irc9012';
    password = 'Word20nyh!';
    loading: boolean = false;

    constructor(
        // private authService: AuthService,
        private userLoginService: UserLoginService,
        private router: Router) { }

    login(loginForm: NgForm) {

        if (loginForm && loginForm.valid) {

            let userName = loginForm.form.value.userName;
            let password = loginForm.form.value.password;
            this.loading = true;

            this.userLoginService.login(userName, password)
                        .subscribe(this.loginComplete, this.handleError);
                // .subscribe(
                // (theuser: IUserLogin) => {B

                //     console.log('here');

                //     if (_.isEmpty(this.userLoginService.redirectUrl) == false) {

                //         this.router.navigateByUrl(this.userLoginService.redirectUrl);

                //     }
                //     else {

                //         this.router.navigate(['/units']);
                //     }
                // },
                // this.handleError
                // );


        }
        else {

            this.errorMessage = 'Please enter a user name and password.';
        
        }
    }

    loginComplete = (theUser: IUserLogin) => {

        console.log('here');
        this.loading = false;

        if (_.isEmpty(this.userLoginService.redirectUrl) === false) {

            this.router.navigateByUrl(this.userLoginService.redirectUrl);

        }
        else {

            this.router.navigate(['/units']);
        }
    }

    handleError = (xx: any) => {

        console.log('here');
        this.loading = false;
        this.errorMessage = xx; //'Please enter a user name and password.';

    }
}
