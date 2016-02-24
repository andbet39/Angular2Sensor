import {Component,OnInit} from 'angular2/core';
import {RouteConfig, Router, RouteParams,ROUTER_DIRECTIVES} from 'angular2/router';
import {SensorDataService} from './sensordata.service';
import {SensorService} from '../sensor/sensor.service';
import {Sensor} from "../sensor/sensor";
import {SensorData} from "./sensordata";
import {SensDataComponent} from "./sensdata.component";
import {MetricsGraph} from "../metricsgraph/metricsgraph";
import {LatestData} from "./latestData.component";

@Component({
    selector: 'sensor-graph',
    directives: [...ROUTER_DIRECTIVES, SensDataComponent, MetricsGraph,LatestData],
    styles: [],
    template: `
              <h2>{{sensor.name}}</h2>
              <form>
                <input type="date" [(ngModel)]="start_dt"><input type="date" [(ngModel)]="end_dt">
                <button class="btn btn-success" (click)="loadAggregate()">Load Data</button>
              </form>
              <latest-data [data]="latestData"></latest-data>
              <metricg [data]="graphdata" [title]="Latest" [description]="sensor.description"></metricg>

              <table class="table">
                <thead>
                <tr>
                  <th>Hour</th>
                   <th>Avg</th>
                   <th>Max</th>
                   <th>Min</th>
                   <th>#</th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="#agg of aggregated">
                  <td>{{agg._id.hour}}</td>
                   <td>{{agg.avg}}</td>
                   <td>{{agg.max}}</td>
                   <td>{{agg.min}}</td>
                   <td>{{agg.count}}</td>
                </tr>
                </tbody>
              </table>
              `
  }
)

export class GraphViewComponent implements OnInit {

  public options:any;
  public sensorData:Array<SensorData> = [];
  public graphdata:any = [];
  public sensor:Sensor = new Sensor();
  public aggregated:any;
  public start_dt:Date = new Date();
  public end_dt:Date = new Date();

  public latestData:SensorData;

  ngOnInit() {
    let id = this._routeParams.get('id');
    this.sensorService.getSensor(id);
  }

  loadData() {
    this.sensorDataService.getData(this.sensor.sens_id);
  }

  loadAggregate() {
    this.sensorDataService.getAggregateByDate(this.sensor.sens_id, this.start_dt, this.end_dt)
      .subscribe(data=> {
        this.aggregated = data.stats;
        console.log(this.aggregated);
        var gdata = [];

        this.aggregated.forEach(elem=> {
          let d = {
            'date': new Date(this.dateFromDayAndTime(elem._id.year, elem._id.dayOfYear, elem._id.hour)),
            'value': elem.avg
          };
          gdata.push(d);
        });

        this.graphdata = gdata;
      })
  }

  dateFromDayAndTime(year, day, hour) {
    var date = new Date(year, 0);
    var daydate = new Date(date.setDate(day));// initialize a date in `year-01-01`
    return daydate.setHours(hour, 0, 0, 0); // add the number of days
  }


  constructor(public sensorDataService:SensorDataService,
              public sensorService:SensorService,
              private _router:Router,
              private _routeParams:RouteParams) {

    this.sensorService.sensor$.subscribe(
      data=> {
        this.sensor = data;
        this.loadData();

        this.sensorDataService.getLatest(this.sensor.sens_id)
            .subscribe(ldata =>{
              this.latestData = new SensorData(ldata[0].sens_id,ldata[0].received,ldata[0].val);
              console.log(this.latestData);
            });
       }
    );

    this.sensorDataService.sensordatas$.subscribe(
      data=> {
        this.sensorData = data;
        this.graphdata = [];

        for (var i = 0; i < data.length; i++) {
          let dat = data[i];
          let e = {
            "date": dat.created,
            "value": dat.val
          };
          this.graphdata.push(e);
        }
      }
    )

  }
}


