import {Directive,Component,Input} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';
import {NgClass} from 'angular2/common';
import {SensorService} from './sensor.service';
import {SensorDataService} from '../sensordata/sensordata.service';
import {Sensor} from './sensor';

@Component({
  selector: '[sensor-row]',
  providers: [ ...FORM_PROVIDERS ],
  directives: [ ...ROUTER_DIRECTIVES],
  pipes: [],
  template: `

  `
})

export class SensorRowComponent {

  @Input() sensor:Sensor=new Sensor();

  constructor(public sensorService:SensorService,public sensorDataService:SensorDataService) {

  }


  get diagnostic(){
    return JSON.stringify(this.sensor);
  }

}
