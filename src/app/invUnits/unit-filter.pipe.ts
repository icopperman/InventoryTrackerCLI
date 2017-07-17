import {  PipeTransform, Pipe } from '@angular/core';
import { IUnit } from './unit';

@Pipe({
    name: 'unitFilter'
})
export class UnitFilterPipe implements PipeTransform {

    transform(value: IUnit[], filterBy: string): IUnit[] {

        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;

        return filterBy ? value.filter((unit: IUnit) =>
            unit.unitName.toLocaleLowerCase().startsWith(filterBy) === true) : value;
    }
}
