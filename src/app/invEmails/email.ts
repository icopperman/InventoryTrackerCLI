import {IUnit} from '../invUnits/unit';

export interface IEmail {
        
    tblIdx: number;
    Campus: string;
    Unit: string;
    EmailAddress: string;
    Units: string[];
    createdDate?: string;
    selectedUnit: IUnit;
}

export class Email {
    
    tblIdx: number;
    Campus: string;
    Unit: string;
    EmailAddress: string;
    Units: string[];
    createdDate?: string;
    selectedUnit: IUnit;
}
