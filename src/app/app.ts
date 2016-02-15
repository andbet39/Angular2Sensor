/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './directives/router-active';
import {Home} from './home/home';
import {SensorFormComponent} from './sensor/sensor-form';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS ],
  directives: [ ...ROUTER_DIRECTIVES, RouterActive ],
  pipes: [],
  template: `
    <header>
    <nav class="navbar navbar-light bg-faded">
      <a class="navbar-brand" href="#">MySensor</a>
      <ul class="nav navbar-nav">
          <li router-active class="nav-item active">
            <a class="nav-link" [routerLink]=" ['Index'] ">Index</a>
          </li>
           <li router-active class="nav-item active">
            <a class="nav-link" [routerLink]=" ['Home'] ">Home</a>
          </li>
            <li router-active class="nav-item active">
            <a class="nav-link" [routerLink]=" ['About'] ">About</a>
          </li>
            <li router-active class="nav-item active">
            <a class="nav-link" [routerLink]=" ['SensorForm'] ">Sensor</a>
          </li>
       </ul>
</nav>
   </header>

    <div  class="container">
      <div class="row">
        <div class="col-md-9 col-md-push-3">
             <router-outlet></router-outlet>
        </div>
         <div class="col-md-3 col-md-pull-9">
              Sidebar
        </div>
      </div>

    </div>

    <footer>
      WebPack Angular 2 Starter by <a [href]="url">@AngularClass</a>

    </footer>
  `
})
@RouteConfig([
  { path: '/', component: Home, name: 'Index' },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/sensor', component: SensorFormComponent, name: 'SensorForm' },
  // Async load a component using Webpack's require with es6-promise-loader
  { path: '/about', loader: () => require('./about/about')('About'), name: 'About' },
  { path: '/**', redirectTo: ['Index'] }
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';
  constructor() {

  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 * or via chat on Gitter at https://gitter.im/AngularClass/angular2-webpack-starter
 */
