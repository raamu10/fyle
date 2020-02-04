import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
declare var $: any;

import { CookieService } from 'ngx-cookie-service';

@Component({
    'selector': 'app-fav-bank',
    'templateUrl': './bank-fav.component.html'
})

export class BankFavourites implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(DataTableDirective, {static: true})
    dtElement: DataTableDirective;

    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

    public favBankList: any = [];

    constructor (private cookieService: CookieService) {

    }

    ngOnInit() {

        this.getFavBanks();

    }

    getFavBanks() {

        var bankList = this.cookieService.get('favBank');

        if (bankList && bankList.length > 0) {
            this.favBankList = JSON.parse(bankList);
            //this.rerenderTable();

            console.log('favBankList:', this.favBankList);
        }
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }


    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }

     /**
     * @name rerenderTable
     * @description
     * Render the table
     */
    rerenderTable(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
        });
    }
}