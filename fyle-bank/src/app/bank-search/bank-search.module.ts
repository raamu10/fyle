import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankSearchRouteModule } from './bank-search.routing';
import { BankSearchComponent } from './bank-search.component';
import { BankSearchService } from './services/bank-search.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        BankSearchComponent
    ],
    imports: [
        CommonModule,
        BankSearchRouteModule,
        NgbModule,
        DataTablesModule,
        HttpClientModule
    ],
    providers: [
        BankSearchService
    ]

})

export class BankSearchModule {}