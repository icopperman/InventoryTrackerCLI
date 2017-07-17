import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//import * as _ from 'lodash';

import { MessageService } from '../messages/message.service';

import { IUser } from './user';
import { UserService } from './user.service';

@Component({
    templateUrl: 'user-edit.component.html',
    styleUrls: ['user-edit.component.css']
})
export class UserEditComponent implements OnInit {
    
    pageTitle: string = 'User Edit';
    errorMessage: string;

    private currentUser: IUser;
    private originalUser: IUser;
    private dataIsValid: { [key: string]: boolean } = {};

    get isDirty(): boolean {
        return JSON.stringify(this.originalUser) !== JSON.stringify(this.currentUser);
    }

    get user(): IUser {
        return this.currentUser;
    }
    set user(value: IUser) {
        this.currentUser = value;
        // Clone the object to retain a copy
        this.originalUser = Object.assign({}, value);
    }

    constructor(private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private messageService: MessageService) { }

    ngOnInit(): void {
        // Watch for changes to the resolve data
        this.route.data.subscribe(data => {
             this.onUserRetrieved(data);
        });
    }

    onUserRetrieved(data: any): void {
        
        this.user = data['user'];

        // Adjust the title
        if (this.user.idUser === 0) {

            this.pageTitle = 'Add User';

        } else {

            this.pageTitle = `Edit User: ${this.user.userCwid}`;
            
        }
    }

    deleteUser(): void {
        
        if (this.user.idUser === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete(`${this.user.userCwid} was deleted`);

        } else {
            if (confirm(`Really delete the user: ${this.user.userCwid}?`)) {
            
                this.userService.deleteUser(this.user.idUser)
                    .subscribe(
                        () => this.onSaveComplete(`${this.user.userCwid} was deleted`),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    isValid(path: string): boolean {

        this.validate();
        
        if (path) {
            return this.dataIsValid[path];
        }
        
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
    }

    saveUser(): void {
        
        if (this.isValid(null)) {

            this.userService.saveUser(this.user)
                .subscribe(
                    () => this.onSaveComplete(`${this.user.userCwid} was saved`),
                    (error: any) => this.errorMessage = <any>error
                );
        } else {

            this.errorMessage = 'Please correct the validation errors.';

        }
    }

    onSaveComplete(message?: string): void {
        
        if (message) {

            this.messageService.addMessage(message);
            
        }
        
        this.reset();
        // Navigate back to the product list
        this.router.navigate(['/users']);
    }

    // Reset the data
    // Required after a save so the data is no longer seen as dirty.
    reset(): void {
        this.dataIsValid = null;
        this.currentUser = null;
        this.originalUser = null;
    }

    validate(): void {
        // Clear the validation object
        this.dataIsValid = {};

        // 'info' tab
        if (this.user.userCwid &&
            this.user.userCwid.length >= 3 &&
            this.user.preferredCampus) {
            this.dataIsValid['info'] = true;
        } else {
            this.dataIsValid['info'] = false;
        }

        // 'tags' tab
        // if (this.user.category &&
        //     this.user.category.length >= 3) {
        //     this.dataIsValid['tags'] = true;
        // } else {
        //     this.dataIsValid['tags'] = false;
        // }
    }
}
