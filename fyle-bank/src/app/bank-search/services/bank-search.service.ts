import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Rx';

import { HttpClient, HttpHeaders} from '@angular/common/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class BankSearchService {

    public responseCache = new Map();

    constructor(private http: HttpClient  ) {
    }

    getBankData(cityName) {

        var url = 'https://vast-shore-74260.herokuapp.com/banks?city=' + cityName;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'text/plain',
                'Accept': 'application/json'
            })
        };

        const fromCache = this.responseCache.get(cityName);
        if (fromCache) {
            return of(fromCache);
        }

        return this.http.get(url,httpOptions) // ...using get request
            .pipe(
                map(resp => {
                        this.responseCache.set(cityName, resp);
                        return resp;
                }),
                catchError(error => Observable.throw(error.error)) //...errors if any
            );
    }
    
}