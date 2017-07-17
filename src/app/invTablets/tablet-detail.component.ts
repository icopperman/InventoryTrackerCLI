import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITablet } from './tablet';
import {IUnit} from '../invUnits/unit';

@Component({
    templateUrl: 'tablet-detail.component.html'
})
export class TabletDetailComponent implements OnInit {
    pageTitle: string = 'Tablet Detail';
    tablet: ITablet;
     units: IUnit[];
    errorMessage: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.tablet = this.route.snapshot.data['tablet'];
    }
}
