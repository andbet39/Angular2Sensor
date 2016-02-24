import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './directives/router-active';
import {Home} from './home/home';
import {SensorFormComponent} from './sensor/sensor-form';
import {SensorViewComponent} from './sensordata/sensor-view.component';
import {LoginFormComponent} from './auth/login.component';
import {GraphViewComponent } from './sensordata/graph-view.component';



@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS ],
  directives: [ ...ROUTER_DIRECTIVES, RouterActive ],
  pipes: [],
  template: require('./app.html')
})
@RouteConfig([
  { path: '/', component: SensorFormComponent, name: 'SensorForm' },
  { path: '/sensor', component: SensorFormComponent, name: 'SensorForm' },
  { path: '/sensorview', component: SensorViewComponent,name: 'SensorView' },
  { path: '/sensorgraph', component: GraphViewComponent,name: 'GraphView' },
  { path: '/login', component: LoginFormComponent,name: 'Login' },
   // Async load a component using Webpack's require with es6-promise-loader
  { path: '/about', loader: () => require('./about/about')('About'), name: 'About' },
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';
  constructor() {

  }
}

