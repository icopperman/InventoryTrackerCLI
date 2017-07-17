import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITablet } from './tablet';

@Component({
    templateUrl: '../app/invTablets/tablet-edit-tags.component.html'
})
export class TabletEditTagsComponent implements OnInit {
    errorMessage: string;
    newTags = '';
    tablet: ITablet;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.parent.data.subscribe(data => {
            this.tablet = data['tablet'];
        });
    }

    // Add the defined tags
    addTags(): void {
        let tagArray = this.newTags.split(',');
        // this.tablet.tags = this.tablet.tags ? this.tablet.tags.concat(tagArray) : tagArray;
        this.newTags = '';
    }

    // Remove the tag from the array of tags.
    removeTag(idx: number): void {
        // this.tablet.tags.splice(idx, 1);
    }
}
