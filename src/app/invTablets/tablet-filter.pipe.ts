import {  PipeTransform, Pipe } from '@angular/core';
import { ITablet } from './tablet';

@Pipe({
    name: 'tabletFilter'
})
export class TabletFilterPipe implements PipeTransform {

    transform(value: ITablet[], filterBy: string): ITablet[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((tablet: ITablet) =>
            tablet.TabletName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
