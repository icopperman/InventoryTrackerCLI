import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { UserEditComponent } from './user-edit.component';

@Injectable()
export class UserEditGuard implements CanDeactivate<UserEditComponent> {

    canDeactivate(component: UserEditComponent): boolean {
        
        if (component.isDirty) {
        
            let userCwid = component.user.userCwid || 'New User';
            return confirm(`Navigate away and lose all changes to ${userCwid}?`);
        }
        
        return true;
    }
}
