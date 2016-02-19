/**
 * Created by andrea.terzani on 19/02/2016.
 */
import {Component,OnInit,Input} from 'angular2/core';
import {RouteConfig, Router, RouteParams,ROUTER_DIRECTIVES} from 'angular2/router';
import {SensorDataService} from './sensordata.service';
import {SensorService} from '../sensor/sensor.service';
import {Sensor} from "../sensor/sensor";
import {SensorData} from "./sensordata";




@Component(
  {
    selector: 'sensor-data',
    directives: [ ...ROUTER_DIRECTIVES],
    template:`<strong>{{sensordata.val}}</strong> - {{sensordata.created}}`
  }
)

export class SensDataComponent {

  @Input() sensordata: SensorData;
    constructor(){}
}


