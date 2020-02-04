import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
declare var $: any;

import { BankSearchService } from './services/bank-search.service';
import { LoaderService } from '../shared/loader/loader.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-bank-search',
    templateUrl: './bank-search.component.html',
    styleUrls: ['./bank-search.css']
})

export class BankSearchComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(DataTableDirective, {static: true})
    dtElement: DataTableDirective;

    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

    public bankList:any = [];
    public favBankList:any = [];
    public savedFavBank: any = []

    public selectedCity = '';
    public cityList= ['BANGALORE', 'CHENNAI', 'KOLKATA', 'MUMBAI', 'PUNE'];
    
    constructor (private bankSearchService: BankSearchService, private loaderService: LoaderService,
        private cookieService: CookieService) {

    }

    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 25,
            destroy: true
        };

        var favBank = this.cookieService.get('favBank');
        this.savedFavBank = favBank ? JSON.parse(favBank) : [];
    }

    /**
     * @name getBankList
     * @param cityName {String}
     * @description
     * Get list of banks for selected city
     */
    getBankList(cityName) {
        console.log("in getBanks");
        this.loaderService.display(true);
        this.bankSearchService.getBankData(cityName).subscribe(res => {
            console.log("res:", res);
            this.bankList = res;
            this.rerenderTable();
            this.loaderService.display(false);
        }, err => {
            this.loaderService.display(false);
            console.log("err:", err);
        })

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

    addFavorite(bank) {

        if (this.favBankList.length === 0) {
            bank.isFav = true;
            this.favBankList.push(bank);
        } else {

            var isExist = false;

            this.favBankList.forEach((member, idx) => {
                if (member.ifsc === bank.ifsc) {
                    isExist = true;
                    bank.isFav = false;
                    this.favBankList.splice(idx, 1);
                }
            });

            if (!isExist) {
                bank.isFav = true;
                this.favBankList.push(bank);
            }

        }

        this.cookieService.set('favBank', JSON.stringify(this.favBankList));

        console.log(this.cookieService.get('favBank'));
    }
}