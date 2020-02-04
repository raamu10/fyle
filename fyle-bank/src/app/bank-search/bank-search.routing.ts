import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankSearchComponent } from './bank-search.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Bank Search'
        },
        component: BankSearchComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
}) 

export class BankSearchRouteModule {}