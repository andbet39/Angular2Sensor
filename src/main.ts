import 'jquery';
require("font-awesome-webpack");
import 'bootstrap-loader';
import 'socket.io-client';
import 'd3';
import 'nvd3';


import {provide, enableProdMode} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {SensorService} from "./app/sensor/sensor.service";
import {SensorDataService} from  './app/sensordata/sensordata.service';
import {AuthService} from  './app/services/auth.service';


const ENV_PROVIDERS = [];
require('./assets/css/main.css');



if ('production' === process.env.ENV) {
  enableProdMode();
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

import {App} from './app/app';

document.addEventListener('DOMContentLoaded', function main() {
  bootstrap(App, [
    ...ENV_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    SensorService,
    SensorDataService,
    AuthService,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
  ])
  .catch(err => console.error(err));

});

// For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
// Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module
