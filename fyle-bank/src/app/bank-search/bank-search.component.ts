import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
declare var $: any;

import { BankSearchService } from './services/bank-search.service';

@Component({
    selector: 'app-bank-search',
    templateUrl: './bank-search.component.html',
    styleUrls: ['./bank-search.css']
})

export class BankSearchComponent implements OnInit {
    @ViewChild(DataTableDirective, {static: true})
    dtElement: DataTableDirective;

    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

    public bankList:any = [];
    
    constructor (private bankSearchService: BankSearchService) {

    }

    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 50,
            destroy: true
        };

        this.getBankList();
    }

    getBankList() {
        console.log("in getBanks");
        this.bankSearchService.getBankData().subscribe(res => {
            console.log("res:", res);
            this.bankList = res;
            this.rerenderTable();
        }, err => {
            console.log("err:", err);
        })

    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }


    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }

    rerenderTable(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
        });
    }
}