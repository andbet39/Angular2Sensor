import {Component,OnInit} from 'angular2/core';
import {RouteConfig, Router, RouteParams,ROUTER_DIRECTIVES} from 'angular2/router';
import {SensorDataService} from './sensordata.service';
import {SensorService} from '../sensor/sensor.service';
import {Sensor} from "../sensor/sensor";
import {SensorData} from "./sensordata";
import {SensDataComponent} from "./sensdata.component";

let d3 = require('d3');
let MG = require('metrics-graphics');

require('metrics-graphics/dist/metricsgraphics.css');


@Component({
  selector: 'sensor-graph',
  directives: [ ...ROUTER_DIRECTIVES,SensDataComponent],
  styles:[],
  template:` <h2>{{sensor.name}}</h2>
              <div id="graph"></div>
              <button (click)="loadData()">Load Data</button>

               <ul>
               <li *ngFor="#data of sensorData">
                 <sensor-data [sensordata]="data"></sensor-data>
               </li>
               </ul>


              `
}
)

export class GraphViewComponent implements OnInit{

  public options:any;
  public sensors:Array<Sensor>=[];
  public sensorData:Array<SensorData>=[];
  public graphdata:any = [];
  public sin=[];
  public MG:any;
  public sensor:Sensor = new Sensor();

  ngOnInit() {
    let id = this._routeParams.get('id');
    this.sensorService.getSensor(id);
  }

  ngAfterViewInit(){

  }

  loadData(){
    this.sensorDataService.getData(this.sensor.sens_id);
  }

  constructor(public sensorDataService:SensorDataService,
              public sensorService:SensorService,
              private _router:Router,
              private _routeParams:RouteParams) {

    this.graphdata = require('metrics-graphics/examples/data/fake_users1.json');

    this.sensorService.sensor$.subscribe(
      data=>{ this.sensor  = data;}
    );

    this.sensorDataService.sensordatas$.subscribe(
      data=>{

        this.sensorData = data;
        this.graphdata =[];


        for (var i =0;i<data.length;i++){
          let dat= data[i];
          let e = {
            "date": dat.created,
            "x":i,// dat.created.getFullYear().toString()+'-'+dat.created.getMonth().toString()+'-'+dat.created.getDay().toString(),
            "value": dat.val
           };
          this.graphdata.push(e);
        }


        console.log("graphData : ");
        console.log(this.graphdata);

        let d  = this.graphdata;// MG.convert.date(this.graphdata, 'date');


        MG.data_graphic({
          title: this.sensor.name,
          description: this.sensor.description,
          animate_on_load: true,
          data: d,
          width: 800,
          height: 400,
          target: ('#graph'),
          x_accessor: 'date',
          y_accessor: 'value'
        });


      }
    )

  }
}


