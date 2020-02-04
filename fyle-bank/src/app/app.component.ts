import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'fyle-bank';

	constructor (private router: Router, private cookieService : CookieService) {
		this.router.navigate(['/bankSearch']);

	}

	logOut() {
		this.cookieService.deleteAll();
		this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
			this.router.navigate(['/bankSearch']);
		});

	}


}
