/**
 * Created by andrea.terzani on 15/02/2016.
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';
import {NgClass} from 'angular2/common';


@Component({
  selector: 'sensor-form',
  providers: [ ...FORM_PROVIDERS ],
  directives: [ ...ROUTER_DIRECTIVES,NgClass],
  pipes: [],
  template: require('./sensor-form.html')
})

export class SensorFormComponent {

  public isOn:boolean;

  onSubmit(){
    console.log("Submit");
   }
  constructor() {
    this.isOn=true;
  }
}
