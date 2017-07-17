import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    NgForm, FormArray, FormArrayName, FormBuilder, FormControl, FormControlName
    , FormGroup, FormGroupName, Validators, ValidatorFn, AbstractControl
} from '@angular/forms';

import 'rxjs/add/operator/debounceTime';

import * as _ from 'lodash';

import { IEmail, Email } from './email';
import { IUnit } from '../invUnits/unit';

@Component({
    templateUrl: 'email-edit-info.component.html'
})
export class EmailEditInfoComponent implements OnInit {
    @ViewChild(NgForm) emailForm: NgForm;

    private emailValidationMessages = {
        required: 'Email address is required.',
        minlength: 'Email address must be at least three characters.',
        email: 'Enter a valid email address'
    };

  private campusValidationMessages = {
        required: 'Campus is required.'
    };  

    private unitsValidationMessages = {
        required: 'Unit is required.'
    };
    
    errorMessage: string;
    email: IEmail;
    units: IUnit[];
    selectedUnit: string;
    ccs: string[];
    origUnits: IUnit[];

    emailFormGroup: FormGroup;
    emailClass: Email = new Email();

    emailMessage: string;
    campusMessage: string;
    unitsMessage: string;

    constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

    emailChanges(c: AbstractControl): void {

        this.emailMessage = '';

        if ((c.touched || c.dirty) && c.errors) {

            let keys = Object.keys(c.errors);
            let amess: string[] = keys.map(akey => this.emailValidationMessages[akey]);
            let themess = amess.join(' ');

            this.emailMessage = themess;

        }
    }

    campusChanges(c: AbstractControl): void {

        this.campusMessage = '';

        if (c.pristine === false) {

            this.email.Campus = c.value;
            this.units = _.filter(this.origUnits, (unit: IUnit) => unit.campus === c.value);
        }

        if ((c.touched || c.dirty) && c.errors) {

            let keys = Object.keys(c.errors);
            let amess: string[] = keys.map(akey => this.campusValidationMessages[akey]);
            let themess = amess.join(' ');

            this.campusMessage = themess;
        }

    }

    unitChanged(value: any): void {

        this.email.Unit = value;

    }

    unitsChanges(c: AbstractControl): void {

        this.unitsMessage = '';

        if ((c.touched || c.dirty) && c.errors) {

            let keys = Object.keys(c.errors);
            let amess: string[] = keys.map(akey => this.unitsValidationMessages[akey]);
            let themess = amess.join(' ');

            this.unitsMessage = themess;

        }

        if (c.pristine === false) {

            this.email.Unit = c.value;

        }

    }

    ngOnInit(): void {

        this.emailFormGroup = this.fb.group({
            emailName: ['', [Validators.required, Validators.minLength(3), Validators.email]],
            emailCampus: ['', [Validators.required]],
            unitsSelector: ['', [Validators.required]]
        });

        const fldEmail = this.emailFormGroup.get('emailName');
        const fldCampus = this.emailFormGroup.get('emailCampus');
        const fldUnits = this.emailFormGroup.get('unitsSelector');

        fldEmail.valueChanges.debounceTime(1000).subscribe(val => this.emailChanges(fldEmail));
        fldCampus.valueChanges.subscribe(val => this.campusChanges(fldCampus));
        fldUnits.valueChanges.subscribe(val => this.unitsChanges(fldUnits));

        this.route.parent.data.subscribe(data => {

            this.email = data['emails'][0];
            this.origUnits = data['units'];
            this.ccs = ['East', 'West'];

            let acampus = this.email.Campus;
            if (acampus.length === 1) {

                acampus = (acampus === 'E') ? 'East' : 'West';
            }

            this.units = _.filter(this.origUnits, (unit: IUnit) => unit.campus === acampus);

            this.email.Campus = acampus;

            fldEmail.patchValue(this.email.EmailAddress);
            fldCampus.patchValue(this.email.Campus);
            fldUnits.patchValue(this.email.Unit);

            // this.origUnits = _.map(this.origUnits, (aunit: IUnit) => {

            //     aunit.campus = (aunit.campus == "E") ? "East" : "West";
            //     return aunit;

            // })
            // this.emailFormGroup.setValue({
            //     emailName: this.email.EmailAddress,
            //     emailCampus: this.email.Campus,
            //     unitsSelector: this.units
            // });

            //if (this.emailForm) {
            //    this.emailForm.reset();
            //}

        });
    }


}
