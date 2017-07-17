import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUser } from './user';

@Component({
    templateUrl: './app/invUsers/user-edit-tags.component.html'
})
export class UserEditTagsComponent implements OnInit {
    errorMessage: string;
    newTags = '';
    user: IUser;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.parent.data.subscribe(data => {
            this.user = data['user'];
        });
    }

    // Add the defined tags
    addTags(): void {
        let tagArray = this.newTags.split(',');
        //this.user.tags = this.user.tags ? this.user.tags.concat(tagArray) : tagArray;
        this.newTags = '';
    }

    // Remove the tag from the array of tags.
    removeTag(idx: number): void {
        //this.user.tags.splice(idx, 1);
    }
}
