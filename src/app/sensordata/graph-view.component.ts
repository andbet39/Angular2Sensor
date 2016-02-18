import {Component,OnInit} from 'angular2/core';
import {RouteConfig, Router, RouteParams,ROUTER_DIRECTIVES} from 'angular2/router';
import {SensorDataService} from './sensordata.service';
import {SensorService} from '../sensor/sensor.service';
import {Sensor} from "../sensor/sensor";

let d3 = require('d3');
let MG = require('metrics-graphics');

require('metrics-graphics/dist/metricsgraphics.css');


@Component({
  selector: 'sensor-graph',
  directives: [ ...ROUTER_DIRECTIVES],
  styles:[],
  template:` <h2>{{sensor.name}}</h2>
              <div id="graph"></div> `
}
)

export class GraphViewComponent implements OnInit{

  public options:any;
  public sensors:Array<Sensor>=[];
  public data:any = [];
  public sin=[];
  public MG:any;
  public sensor:Sensor = new Sensor();

  ngOnInit() {
    let id = this._routeParams.get('id');
    this.sensorService.getSensor(id);
  }

  ngAfterViewInit(){
    let d  = MG.convert.date(this.data, 'date');

    MG.data_graphic({
      title: "Line Chart",
      description: "This is a simple line chart. You can remove the area portion by adding area: false to the arguments list.",
      data: d,
      width: 800,
      height: 400,
      right: 40,
      color: '#8C001A',
      target: ('#graph'),
      x_accessor: 'date',
      y_accessor: 'value'
    });

  }


  constructor(public sensorDataService:SensorDataService,
              public sensorService:SensorService,
              private _router:Router,
              private _routeParams:RouteParams) {

    this.data = require('metrics-graphics/examples/data/fake_users1.json');

    this.sensorService.sensor$.subscribe(
      data=>{ this.sensor  = data;}
    );

  }
}


