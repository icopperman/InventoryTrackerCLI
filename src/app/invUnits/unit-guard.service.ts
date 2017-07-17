import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { UnitEditComponent } from './unit-edit.component';

@Injectable()
export class UnitEditGuard implements CanDeactivate<UnitEditComponent> {

    canDeactivate(component: UnitEditComponent): boolean {
        
        if (component.isDirty) {
            
            let unitName = component.unit.unitName || 'New Unit';
            return confirm(`Navigate away and lose all changes to ${unitName}?`);
        }
        
        return true;
    }
}
