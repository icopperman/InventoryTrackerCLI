import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmail } from './email';

@Component({
    templateUrl: '../app/invEmails/email-edit-tags.component.html'
})
export class EmailEditTagsComponent implements OnInit {
    errorMessage: string;
    newTags = '';
    email: IEmail;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.parent.data.subscribe(data => {
            this.email = data['emails'][0];
        });
    }

    // Add the defined tags
    addTags(): void {
        let tagArray = this.newTags.split(',');
        //this.email.tags = this.email.tags ? this.email.tags.concat(tagArray) : tagArray;
        this.newTags = '';
    }

    // Remove the tag from the array of tags.
    removeTag(idx: number): void {
        //this.email.tags.splice(idx, 1);
    }
}
