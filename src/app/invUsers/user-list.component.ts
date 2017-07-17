import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//import * as _ from 'lodash';

import { IUser } from './user';
import { UserService } from './user.service';

@Component({
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.css']
})
export class UserListComponent implements OnInit {
    pageTitle: string = 'User List';
    // imageWidth: number = 50;
    // imageMargin: number = 2;
    // showImage: boolean = false;
    listFilter: string;
    errorMessage: string;

    users: IUser[];

    constructor(private userService: UserService,
                private route: ActivatedRoute) { }

    // toggleImage(): void {
    //     this.showImage = !this.showImage;
    // }

    ngOnInit(): void {
        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
        //this.showImage = (this.route.snapshot.queryParams['showImage'] === 'true');
        // console.log(this.route.snapshot.queryParamMap.get('filterBy'));            

        this.userService.getUsers()
                .subscribe(users => this.users = users,
                           error => this.errorMessage = <any>error);
    }
}
