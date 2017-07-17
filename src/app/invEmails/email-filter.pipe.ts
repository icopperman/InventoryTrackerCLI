import {  PipeTransform, Pipe } from '@angular/core';
import { IEmail } from './email';

@Pipe({
    name: 'emailFilter'
})
export class EmailFilterPipe implements PipeTransform {

    transform(value: IEmail[], filterBy: string): IEmail[] {

        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;

        return filterBy ? value.filter((email: IEmail) =>
            email.EmailAddress.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;

    }
}
