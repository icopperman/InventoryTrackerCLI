import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

import { ITablet } from './tablet';
import { IUnit } from '../invUnits/unit';

@Component({
    templateUrl: 'tablet-edit-info.component.html'
})
export class TabletEditInfoComponent implements OnInit {
    @ViewChild(NgForm) tabletForm: NgForm;

    errorMessage: string;
    tablet: ITablet;
    units: IUnit[];
    selectedUnit: string;
    ccs: string[];
    statuses: string[];
    origUnits: IUnit[];

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.parent.data.subscribe(data => {
            this.tablet = data['tablet'];
            this.origUnits = data['units'];
            this.ccs       = ['East', 'West'];
            this.statuses  = ['Unassigned', 'Assigned'];
            // this.origUnits = _.map(this.origUnits, (aunit: IUnit) => {

            //     aunit.campus = (aunit.campus == "E") ? "East" : "West";
            //     return aunit;

            // })

            let acampus = this.tablet.Campus;

            if (acampus.length === 1) {

                acampus = (acampus === 'E') ? 'East' : 'West';
            }
            
            this.units = _.filter(this.origUnits, (unit: IUnit) => unit.campus === acampus);

            this.tablet.Campus = acampus;

            if (this.tabletForm) {
                this.tabletForm.reset();
            }
        });
    }

     campusChanged(value: any): void {
   
        this.tablet.Campus = value;
        this.units = _.filter(this.origUnits, (unit: IUnit) => unit.campus === value);
    }

    unitChanged(value: any): void {

        this.tablet.Unit = value;
    }

    statusChanged(value: any): void {

        this.tablet.Status = value;

    }
}
