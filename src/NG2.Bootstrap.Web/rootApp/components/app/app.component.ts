import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';

import { WelcomeComponent } from '../welcome/welcome.component';

@Component({
    selector: 'root-app',
    templateUrl: 'rootApp/components/app/app.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
        { path: 'Welcome', as: 'Welcome', component: WelcomeComponent, useAsDefault: true },
])
export class AppComponent {

    constructor() {
        
    }

}
