import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { ITablet } from './tablet';
import { TabletService } from './tablet.service';

import { IUnit } from '../invUnits/unit';

@Component({
    templateUrl: 'tablet-list.component.html',
    styleUrls: ['tablet-list.component.css']
})
export class TabletListComponent implements OnInit {
    pageTitle: string = 'Tablet List';
    // imageWidth: number = 50;
    // imageMargin: number = 2;
    // showImage: boolean = false;
    listFilter: string;
    errorMessage: string;

    tablets: ITablet[];
    units: IUnit[];

    constructor(private tabletService: TabletService,
        private route: ActivatedRoute) { }

    // toggleImage(): void {
    //     this.showImage = !this.showImage;
    // }

    ngOnInit(): void {
        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
        // this.showImage = (this.route.snapshot.queryParams['showImage'] === 'true');
        // console.log(this.route.snapshot.queryParamMap.get('filterBy'));            

        this.tabletService.getTablets()
            .subscribe(tablets => {

                this.tablets = _.map(tablets, (atablet: ITablet) => {
                    atablet.Campus = (atablet.Campus === 'E') ? 'East' : 'West';
                    return atablet;
                });
            },
            error => this.errorMessage = <any>error);
    }
}
