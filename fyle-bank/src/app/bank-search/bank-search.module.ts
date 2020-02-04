import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BankSearchRouteModule } from './bank-search.routing';
import { BankSearchComponent } from './bank-search.component';
import { BankFavourites } from './bank-fav.component';
import { BankSearchService } from './services/bank-search.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
    declarations: [
        BankSearchComponent,
        BankFavourites
    ],
    imports: [
        CommonModule,
        BankSearchRouteModule,
        NgbModule,
        DataTablesModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        BankSearchService,
        CookieService
    ]

})

export class BankSearchModule {}