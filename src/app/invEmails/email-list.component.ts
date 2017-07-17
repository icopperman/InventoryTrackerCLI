import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { IEmail } from './email';
import { IUnit } from '../invUnits/unit';

import { EmailService } from './email.service';

@Component({
    templateUrl: 'email-list.component.html',
    styleUrls: ['email-list.component.css']
})
export class EmailListComponent implements OnInit {

    pageTitle: string = 'Email List';

    listFilter: string;
    errorMessage: string;

    emails: IEmail[];
    units: IUnit[];

    constructor(private emailService: EmailService, private route: ActivatedRoute) { }

    ngOnInit(): void {

        this.route.data.subscribe((data: { emails: IEmail[] }) => {

            let xx = data.emails;
            this.emails = _.map(xx, (aemail: IEmail) => {

                aemail.Campus = (aemail.Campus === 'E') ? 'East' : 'West';

                return aemail;

            });

            this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
            console.log(this.route.snapshot.queryParamMap.get('filterBy'));
        });

    }

}