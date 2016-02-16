/**
 * Created by andreaterzani on 15/02/16.
 */
/**
 * Created by andrea.terzani on 15/02/2016.
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {SensorService} from './sensor.service';
import {Sensor} from "./sensor";
import {OnInit} from "../../../node_modules/angular2/ts/src/core/linker/interfaces";
import {SensorViewComponent} from '../sensordata/sensor-view.component';

@Component({
  selector: 'sensor-list',
  directives: [ ...ROUTER_DIRECTIVES],
  pipes: [],
  template: require('./sensor-list.html')
})

export class SensorListComponent implements OnInit{

  ngOnInit() {
    this.sensorService.loadSensor();

  }

  public sensors:Array<Sensor>=[];

  constructor(public sensorService:SensorService) {

    sensorService.sensors$.subscribe(
      data=>{
        this.sensors=data;
      }
    );

  }

  onSubmit(){
    console.log("Smit");
    this.sensorService.loadSensor();
  }
}
