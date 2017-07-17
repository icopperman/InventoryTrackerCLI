import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { TabletEditComponent } from './tablet-edit.component';

@Injectable()
export class TabletEditGuard implements CanDeactivate<TabletEditComponent> {

    canDeactivate(component: TabletEditComponent): boolean {
        if (component.isDirty) {
            let tabletName = component.tablet.TabletName || 'New Tablet';
            return confirm(`Navigate away and lose all changes to ${tabletName}?`);
        }
        return true;
    }
}
