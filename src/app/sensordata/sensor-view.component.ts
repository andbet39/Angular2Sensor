import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {SensorDataService} from './sensordata.service';
import {Sensor} from "../sensor/sensor";
import {OnInit} from "../../../node_modules/angular2/ts/src/core/linker/interfaces";

@Component({
  selector: 'sensor-view',
  directives: [ ...ROUTER_DIRECTIVES],
  pipes: [],
  template:' <h1>Sensor view</h1>'
})

export class SensorViewComponent implements OnInit{

  ngOnInit() {
  }

  public sensors:Array<Sensor>=[];

  constructor(public sensorDataService:SensorDataService) {

  }

}
