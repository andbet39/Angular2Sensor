/**
 * Created by andreaterzani on 15/02/16.
 */

import {Injectable} from 'angular2/core';
import {Sensor} from './sensor';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Http,HTTP_PROVIDERS,Headers} from 'angular2/http';


@Injectable()
export class SensorService {


  sensors$: Observable<Array<Sensor>>;

  private _sensorsObserver: any;

  private _dataStore: {
    sensors: Array<Sensor>
  };

  constructor(public http:Http) {
    this.sensors$ = new Observable(observer =>
      this._sensorsObserver = observer).share();

    this._dataStore = { sensors: []};

  }


  createSensor(sensor:Sensor){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json ; charset=utf-8');


    this.http.post('http://127.0.0.1:3001/api/sensors',JSON.stringify(sensor),{headers:headers})
      .subscribe(
        data => {
          this._dataStore.sensors.push(sensor);
          if(this._sensorsObserver)
            this._sensorsObserver.next(this._dataStore.sensors);
        },
        err => console.error(err)
      );
  }

  loadSensor(){
    console.log("SensorService -> loadsensor")
    this.http.get('http://127.0.0.1:3001/api/sensors')
        .map(res => res.json() )
        .subscribe(
          data=>{
            this._dataStore.sensors=[];
            data.forEach(sens =>{
              this._dataStore.sensors.push(new Sensor(sens.sens_id,sens.name,sens.description));
            });
            console.log(this._dataStore.sensors);
            this._sensorsObserver.next(this._dataStore.sensors);
          },
          err =>{
            console.log(err)
          }
        )
  }
}
