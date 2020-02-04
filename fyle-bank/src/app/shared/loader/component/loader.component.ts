/**
* Created by Harish Chandra.
*/
import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
    selector: 'loader',
    templateUrl: 'loader.component.html'
})
export class LoaderComponent implements OnInit {
    showLoader: boolean;

    constructor(private loaderService: LoaderService) { }

    ngOnInit() {
        this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
    }

    dismissLoader() {
        this.showLoader = false;
    }

}
