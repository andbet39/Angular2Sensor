/**
 * Created by andrea.terzani on 15/02/2016.
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';
import {NgClass} from 'angular2/common';
import {SensorService} from './sensor.service';
import {Sensor} from './sensor';
import {SensorListComponent} from './sensor-list';


@Component({
  selector: 'sensor-form',
  providers: [ ...FORM_PROVIDERS ],
  directives: [ ...ROUTER_DIRECTIVES,NgClass,SensorListComponent],
  pipes: [],
  template: require('./sensor-form.html')
})

export class SensorFormComponent {

  public isOn:boolean;
  private sensor:Sensor=new Sensor();

  constructor(public sensorService:SensorService) {

  }

  onSubmit(){
    console.log("Smit");
    this.sensorService.createSensor(this.sensor);
   }


  get diagnostic(){
    return JSON.stringify(this.sensor);
  }

}
