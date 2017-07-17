import { Component } from '@angular/core';
import { Router, Event, 
    NavigationStart, NavigationEnd, NavigationError, NavigationCancel,
    RoutesRecognized, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

//import { AuthService } from './user/auth.service';
import { UserLoginService } from './user/user-login.service';
import { MessageService } from './messages/message.service';

@Component({
    selector: 'pm-app',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    
    pageTitle: string = 'Tablet Inventory Management';
    loading: boolean = true;

    constructor(
                private messageService: MessageService,
                private userLoginService: UserLoginService,
                private router: Router
                //private authService: AuthService,
                ) {

        router.events.subscribe((routerEvent: Event) => {
            this.checkRouterEvent(routerEvent);
        });
    }

    checkRouterEvent(routerEvent: Event): void {

        if (routerEvent instanceof NavigationStart) {
            this.loading == true;
            console.log('navstart:' + this.loading);
        }

        if (routerEvent instanceof NavigationEnd ) {
            this.loading = false;
            console.log('navend:' + this.loading);
        }

        if ( routerEvent instanceof NavigationCancel ) 
        { 
            this.loading = false;
            console.log('navcancel:' + this.loading);
        } 

        if ( routerEvent instanceof NavigationError) {
        
            this.loading = false;
            console.log('naverrror:' + this.loading);
        }
        if ( routerEvent instanceof RoutesRecognized) {
        
            //this.loading = false;
            console.log('routesRec:' + this.loading);
        }
        if ( routerEvent instanceof RouteConfigLoadStart) {
        
            //this.loading = false;
            console.log('routesConfigLoadStart:' + this.loading);
        }
        if ( routerEvent instanceof RouteConfigLoadEnd) {
        
            //this.loading = false;
            console.log('routesConfigLoadEnd:' + this.loading);
        }
    }

    displayMessages(): void {
        // Example of primary and secondary routing together
        // this.router.navigate(['/login', {outlets: { popup: ['messages']}}]); // Does not work
        // this.router.navigate([{outlets: { primary: ['login'], popup: ['messages']}}]); // Works
        this.router.navigate([{outlets: { popup: ['messages']}}]); // Works
        this.messageService.isDisplayed = true;
    }

    hideMessages(): void {

        this.router.navigate([{ outlets: { popup: null } }]);
        this.messageService.isDisplayed = false;
    }

    logOut(): void {

        this.userLoginService.logout();
        this.router.navigateByUrl('/welcome');
    }
}
