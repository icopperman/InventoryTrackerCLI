import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { MessageService } from '../messages/message.service';

import { IEmail } from './email';
import { EmailService } from './email.service';
import { IUnit } from '../invUnits/unit';

@Component({
    templateUrl: 'email-edit.component.html',
    styleUrls: ['email-edit.component.css']
})
export class EmailEditComponent implements OnInit {

    pageTitle: string = 'Email Edit';
    errorMessage: string;

    private currentEmail: IEmail;
    private originalEmail: IEmail;
    private dataIsValid: boolean;
    private units: IUnit[];

    get isDirty(): boolean {

        let currEmail;

        if (_.isEmpty(this.currentEmail) === true) {

            return false;
        }

        currEmail = _.omit(this.currentEmail, ['selectedUnit']);

        return JSON.stringify(this.originalEmail) !== JSON.stringify(currEmail);
    }

    get email(): IEmail {

        return this.currentEmail;

    }

    set email(value: IEmail) {

        this.currentEmail = value;
        this.currentEmail.Campus = (this.currentEmail.Campus === 'E') ? 'East' : 'West';

        // Clone the object to retain a copy
        this.originalEmail = Object.assign({}, value);
    }

    constructor(private route: ActivatedRoute, private router: Router,
        private emailService: EmailService, private messageService: MessageService) { }

    ngOnInit(): void {
        // Watch for changes to the resolve data
        this.route.data.subscribe(data => {

            this.onEmailRetrieved(data);

        });
    }

    onEmailRetrieved(data: any): void {

        this.email = data['emails'][0];
        this.units = data['units'];
        let eunit = this.email.Unit;

        for (let aunit of this.units) {

            if (eunit === aunit.unitName) {

                this.email.selectedUnit = aunit;
                break;
            }
        }

        // Adjust the title
        this.pageTitle = (this.email.tblIdx === 0) ? 'Add Email' : `Edit Email: ${this.email.EmailAddress}`;

    }

    deleteEmail(): void {

        if (this.email.tblIdx === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete(`${this.email.EmailAddress} was deleted`);

        } else {

            if (confirm(`Really delete the email: ${this.email.EmailAddress}?`)) {

                this.emailService.deleteEmail(this.email.tblIdx)
                    .subscribe(
                    () => this.onSaveComplete(`${this.email.EmailAddress} was deleted`),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    isValid(): boolean {

        this.validate();

        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
    }

    validate(): void {
        // Clear the validation object
        this.dataIsValid = false;

        if (this.email.EmailAddress &&
            this.email.EmailAddress.length >= 3 &&
            //this.emailValidator(this.email.EmailAddress) === true &&
            this.email.Campus &&
            this.email.Unit) {
            this.dataIsValid = true;
        } else {
            this.dataIsValid = false;
        }


    }
    
    saveEmail(): void {

        if (this.isValid()) {

            if (this.email.Campus.length > 1) {

                this.email.Campus = (this.email.Campus === 'East') ? 'E' : 'W';

            }

            this.emailService.saveEmail(this.email)
                .subscribe(
                () => this.onSaveComplete(`${this.email.EmailAddress} was saved`),
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
        this.router.navigate(['/emails']);
    }

    // Reset the data
    // Required after a save so the data is no longer seen as dirty.
    reset(): void {

        this.dataIsValid = null;
        this.currentEmail = null;
        this.originalEmail = null;
    }

}
