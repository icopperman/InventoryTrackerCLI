import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { EmailEditComponent } from './email-edit.component';

@Injectable()
export class EmailEditGuard implements CanDeactivate<EmailEditComponent> {

    canDeactivate(component: EmailEditComponent): boolean {
       
        if (component.isDirty) {
        
            let emailName = component.email.EmailAddress || 'New Email';
            return confirm(`Navigate away and lose all changes to ${emailName}?`);
        
        }
        
        return true;
    }
}
