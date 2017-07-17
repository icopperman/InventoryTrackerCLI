import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

//import * as _ from 'lodash';

import { IUser } from './user';

@Component({
    templateUrl: 'user-edit-info.component.html'
})
export class UserEditInfoComponent implements OnInit {
    
    @ViewChild(NgForm) userForm: NgForm;

    errorMessage: string;
    user: IUser;
    ccs: string[];
    types: string[];

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.parent.data.subscribe(data => {
            
            this.user = data['user'];
            this.ccs  = ['East', 'West'];
            this.types = ['Admin', 'User', 'Non-Clinical'];

//            let acampus = this.user.preferredCampus;
//           this.user.preferredCampus = acampus;

            if (this.userForm) {
                this.userForm.reset();
            }
        });
    }

     campusChanged(value: any): void {
   
        this.user.preferredCampus = value;
        //this.units = _.filter(this.origUnits, (unit: IUnit) => unit.campus == value);
    }

     typeChanged(value: any): void {
   
        this.user.isAdmin = value;
        //this.units = _.filter(this.origUnits, (unit: IUnit) => unit.campus == value);
    }
}
