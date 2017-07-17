
import {IUnit} from '../invUnits/unit';

export interface ITablet {
    // id: number;
    // category: string;
    // tags?: string[];
    // releaseDate: string;
    // price: number;
    // description: string;
    // starRating: number;
    // imageUrl: string;
    // tabletCode: string;
    // campus1: string;
    // name: string;
    // site: string;
    // active: string;
    createdDate?: string;
    
    Campus: string;
    Status: string;
    TabletName: string;
    Unit: string;
    tblIdx: number;
    selectedUnit: IUnit;


}
