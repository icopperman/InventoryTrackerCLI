import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { MessageService } from '../messages/message.service';

import { ITablet } from './tablet';
import { TabletService } from './tablet.service';
import { IUnit } from '../invUnits/unit';

@Component({
    templateUrl: 'tablet-edit.component.html',
    styleUrls: ['tablet-edit.component.css']
})
export class TabletEditComponent implements OnInit {
    pageTitle: string = 'Tablet Edit';
    errorMessage: string;

    private currentTablet: ITablet;
    private originalTablet: ITablet;
    private dataIsValid: { [key: string]: boolean } = {};
     private units: IUnit[];

    get isDirty(): boolean {
        let currTablet;

        if (_.isEmpty(this.currentTablet) === true) {
        
            return false;
        }
        
        currTablet = _.omit(this.currentTablet, ['selectedUnit']);

        return JSON.stringify(this.originalTablet) !== JSON.stringify(this.currentTablet);
    }

    get tablet(): ITablet {
        return this.currentTablet;
    }
    set tablet(value: ITablet) {
        this.currentTablet = value;
        this.currentTablet.Campus = (this.currentTablet.Campus === 'E' ) ? 'East' : 'West';

        // Clone the object to retain a copy
        this.originalTablet = Object.assign({}, value);
    }

    constructor(private route: ActivatedRoute,
        private router: Router,
        private tabletService: TabletService,
        private messageService: MessageService) { }

    ngOnInit(): void {
        // Watch for changes to the resolve data
        this.route.data.subscribe(data => {
             this.onTabletRetrieved(data);
        });
    }

    onTabletRetrieved(data: any): void {
       this.tablet = data['tablet'];
        this.units = data['units'];

        for (let aunit of this.units) {
            
            if ( this.tablet.Unit === aunit.unitName) {

                this.tablet.selectedUnit = aunit;
                break;
            }
        }
        // Adjust the title
        if (this.tablet.tblIdx === 0) {
            this.pageTitle = 'Add Tablet';
        } else {    
            this.pageTitle = `Edit Tablet: ${this.tablet.TabletName}`;
        }
    }

    deleteTablet(): void {
        if (this.tablet.tblIdx === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete(`${this.tablet.TabletName} was deleted`);
        } else {
            if (confirm(`Really delete the tablet: ${this.tablet.TabletName}?`)) {
                this.tabletService.deleteTablet(this.tablet.tblIdx)
                    .subscribe(
                        () => this.onSaveComplete(`${this.tablet.TabletName} was deleted`),
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

    saveTablet(): void {

        if (this.isValid(null)) {
             
             if ( this.tablet.Campus.length > 1 ) {

                this.tablet.Campus = (this.tablet.Campus === 'East') ? 'E' : 'W';

            }

            this.tabletService.saveTablet(this.tablet)
                .subscribe(
                    () => this.onSaveComplete(`${this.tablet.TabletName} was saved`),
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
        this.router.navigate(['/tablets']);
    }

    // Reset the data
    // Required after a save so the data is no longer seen as dirty.
    reset(): void {
        this.dataIsValid = null;
        this.currentTablet = null;
        this.originalTablet = null;
    }

    validate(): void {
        // Clear the validation object
        this.dataIsValid = {};

        // 'info' tab
        if (this.tablet.TabletName &&
            this.tablet.TabletName.length >= 3 &&
            this.tablet.Campus &&
            this.tablet.Unit) {
            this.dataIsValid['info'] = true;
        } else {
            this.dataIsValid['info'] = false;
        }

        // 'tags' tab
        // if (this.tablet.category &&
        //     this.tablet.category.length >= 3) {
        //     this.dataIsValid['tags'] = true;
        // } else {
        //     this.dataIsValid['tags'] = false;
        // }
    }
}
