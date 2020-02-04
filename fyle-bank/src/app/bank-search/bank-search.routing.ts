import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankSearchComponent } from './bank-search.component';
import { BankFavourites } from './bank-fav.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Bank Search'
        },
        component: BankSearchComponent
    }, {

        path: 'favouriteBank',
        data: {
            title: 'Favourite Banks'
        },
        component: BankFavourites
        
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
}) 

export class BankSearchRouteModule {}