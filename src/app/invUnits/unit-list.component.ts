import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//import * as _ from 'lodash';

import { IUnit } from './unit';
import { UnitService } from './unit.service';

@Component({
    templateUrl: 'unit-list.component.html',
    styleUrls: ['unit-list.component.css']
})
export class UnitListComponent implements OnInit {
    pageTitle: string = 'Unit List';
    // imageWidth: number = 50;
    // imageMargin: number = 2;
    // showImage: boolean = false;
    listFilter: string;
    errorMessage: string;

    units: IUnit[];

    constructor(private unitService: UnitService,
        private route: ActivatedRoute) { }

    // toggleImage(): void {
    //     this.showImage = !this.showImage;
    // }

    ngOnInit(): void {
        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
        //        this.showImage = (this.route.snapshot.queryParams['showImage'] === 'true');
        // console.log(this.route.snapshot.queryParamMap.get('filterBy'));            

        this.unitService.getUnits()
            .subscribe(
                units => this.units = units,
                error => this.errorMessage = <any>error
            );
    }

    
}
