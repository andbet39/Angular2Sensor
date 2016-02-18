import {Component,OnInit} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {SensorDataService} from './sensordata.service';
import {Sensor} from "../sensor/sensor";
let d3 = require('d3');
let nvd3 = require('nvd3');
import {nvD3} from '../directives/ng2-nvd3';

require('nvd3/build/nv.d3.css');

@Component({
  selector: 'sensor-view',
  directives: [ ...ROUTER_DIRECTIVES,nvD3],
  template:`
    <div>
      <nvd3 [options]="options" [data]="data"></nvd3>
    </div>
  `}
)

export class SensorViewComponent implements OnInit{

  public options:any;
  public sensors:Array<Sensor>=[];
  public data:any = [];
  public sin=[];

  ngOnInit() {

    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        showValues: true,
        valueFormat: function(d){
          return d3.format(',.4f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -10
        }
      }
    };

    this.data = [
        {
          values: this.sin,      //values - represents the array of {x,y} data points
          key: 'Sine Wave', //key  - the name of the series.
          color: '#ff7f0e'  //color - optional: choose your own line color.
        }
    ];
  }


  constructor(public sensorDataService:SensorDataService) {

    for (var i = 0; i < 100; i++) {
      this.sin.push({x: i, y: Math.sin(i/10)});

    }

  }

}


