import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route,
         CanActivate, CanActivateChild, CanLoad } from '@angular/router';

// import { AuthService } from './auth.service';
import { UserLoginService } from './user-login.service';

@Injectable()
export  class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        //private authService: AuthService,
                private userLoginService: UserLoginService,
                private router: Router) { }

    checkLoggedIn(url: string): boolean {

        if (this.userLoginService.isLoggedIn()) {
            
            return true;
            
        }

        // Retain the attempted URL for redirection
        this.userLoginService.redirectUrl = url;
        this.router.navigate(['/login']);

        return false;
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
        console.log('In canActivate: ' + state.url);

        return this.checkLoggedIn(state.url);

    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
        console.log('In canActivateChild: ' + state.url);

        return this.checkLoggedIn(state.url);

    }

    canLoad(route: Route): boolean {
        
        console.log('In canLoad: ' + route.path);

        return this.checkLoggedIn(route.path);

    }

   
}
