/**
 * Created by andreaterzani on 15/02/16.
 */

import {Injectable} from 'angular2/core';
import {Sensor} from './sensor';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Http,HTTP_PROVIDERS,Headers} from 'angular2/http';
import {AuthService} from '../services/auth.service';


@Injectable()
export class SensorService {


  sensors$: Observable<Array<Sensor>>;
  sensor$:Observable<Sensor>;

  private _sensorsObserver: any;
  private _sensorObserver:any;

  private _dataStore: {
    sensors: Array<Sensor>,
    sensor:Sensor
  };

  constructor(public http:Http,private _authService:AuthService) {
    this.sensors$ = new Observable(observer =>
      this._sensorsObserver = observer).share();

    this.sensor$ = new Observable(observer =>
      this._sensorObserver = observer).share();

    this._dataStore = { sensors: [],sensor:null};

  }


  createSensor(sensor:Sensor){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json ; charset=utf-8');

    /*
    if(this._authService.loggedUser.accessToken){
      headers.append('Authorization',this._authService.loggedUser.accessToken );
    }
*/

    this.http.post('http://127.0.0.1:3001/api/sensors',JSON.stringify(sensor),{headers:headers})
      .map(res => res.json() )
      .subscribe(
        data => {
          console.log(data);
          this._dataStore.sensors.push(new Sensor(data.sens_id,data.name,data.description,data.id));
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
              this._dataStore.sensors.push(new Sensor(sens.sens_id,sens.name,sens.description,sens.id));
            });
            console.log(this._dataStore.sensors);
            this._sensorsObserver.next(this._dataStore.sensors);
          },
          err =>{
            console.log(err)
          }
        )
  }

  getSensor(id:string){
    console.log("SensorService -> loadsensor");
    this.http.get('http://127.0.0.1:3001/api/sensors/'+id)
      .map(res => res.json())
      .subscribe(
        data=>{
          this._dataStore.sensor=data;
          this._sensorObserver.next(this._dataStore.sensor);
        },
        err =>{
          console.log(err)
        }
      )
  }

  /*getSensorP(id:string){
    return this.http.get('http://127.0.0.1:3001/api/sensors/'+id)
      .map(res => res.json()).toPromise();
  }*/

}
