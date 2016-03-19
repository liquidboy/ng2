import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouterLink, RouteParams } from 'angular2/router';

@Component({
    selector: 'jf-welcome',
    templateUrl: 'rootApp/components/welcome/welcome.html',
    styleUrls: ['rootApp/components/welcome/welcome.css'],
    directives: [CORE_DIRECTIVES, RouterLink]
})
export class WelcomeComponent {

    constructor(
        private params: RouteParams
    ) {
        
    }

    ngOnInit() {
        console.log('Home - ngOnInit')
    }
}