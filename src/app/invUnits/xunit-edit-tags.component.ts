import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUnit } from './unit';

@Component({
    templateUrl: './app/invUnits/unit-edit-tags.component.html'
})
export class UnitEditTagsComponent implements OnInit {
    errorMessage: string;
    newTags = '';
    unit: IUnit;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.parent.data.subscribe(data => {
            this.unit = data['unit'];
        });
    }

    // Add the defined tags
    addTags(): void {
        let tagArray = this.newTags.split(',');
//        this.unit.tags = this.unit.tags ? this.unit.tags.concat(tagArray) : tagArray;
        this.newTags = '';
    }

    // Remove the tag from the array of tags.
    removeTag(idx: number): void {
  //      this.unit.tags.splice(idx, 1);
    }
}
