import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//import * as _ from 'lodash';

import { MessageService } from '../messages/message.service';

import { IUnit } from './unit';
import { UnitService } from './unit.service';

@Component({
    templateUrl: 'unit-edit.component.html',
    styleUrls: ['unit-edit.component.css']
})
export class UnitEditComponent implements OnInit {
    
    pageTitle: string = 'Unit Edit';
    errorMessage: string;

    private currentUnit: IUnit;
    private originalUnit: IUnit;
    private dataIsValid: { [key: string]: boolean } = {};

    get isDirty(): boolean {
        return JSON.stringify(this.originalUnit) !== JSON.stringify(this.currentUnit);
    }

    get unit(): IUnit {
        return this.currentUnit;
    }
    set unit(value: IUnit) {
        
        this.currentUnit = value;
        
        // Clone the object to retain a copy
        this.originalUnit = Object.assign({}, value);
    }

    constructor(private route: ActivatedRoute,
        private router: Router,
        private unitService: UnitService,
        private messageService: MessageService) { }

    ngOnInit(): void {
        // Watch for changes to the resolve data
        this.route.data.subscribe(data => {
             this.onUnitRetrieved(data);
        });
    }

    onUnitRetrieved(data: any): void {
       
        this.unit = data['unit'];
        let func = data.func;

        if ( func === 'delete') {
            this.deleteUnit();

        }
        // Adjust the title
        if (this.unit.idUnit === 0) {

            this.pageTitle = 'Add Unit';

        } else {
            
            this.pageTitle = `Edit Unit: ${this.unit.unitName}`;
        }
    }

    deleteUnit(): void {

        if (this.unit.idUnit === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete(`${this.unit.unitName} was deleted`);
        } else {
        
            if (confirm(`Really delete the unit: ${this.unit.unitName}?`)) {
        
                this.unitService.deleteUnit(this.unit.idUnit)
                    .subscribe(
                        () => this.onSaveComplete(`${this.unit.unitName} was deleted`),
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

    saveUnit(): void {

        if (this.isValid(null)) {
      
            this.unitService.saveUnit(this.unit)
                .subscribe(
                    () => this.onSaveComplete(`${this.unit.unitName} was saved`),
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
        this.router.navigate(['/units']);
    }

    // Reset the data
    // Required after a save so the data is no longer seen as dirty.
    reset(): void {
        this.dataIsValid = null;
        this.currentUnit = null;
        this.originalUnit = null;
    }

    validate(): void {
        // Clear the validation object
        this.dataIsValid = {};

        // 'info' tab
        if (this.unit.unitName &&
            this.unit.unitName.length >= 2 &&
            this.unit.campus) {
            this.dataIsValid['info'] = true;
        } else {
            this.dataIsValid['info'] = false;
        }

        // 'tags' tab
        // if (this.unit.category &&
        //     this.unit.category.length >= 3) {
        //     this.dataIsValid['tags'] = true;
        // } else {
        //     this.dataIsValid['tags'] = false;
        // }
    }
}
