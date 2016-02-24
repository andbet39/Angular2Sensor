import {SensorData} from './sensordata';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http,HTTP_PROVIDERS,Headers} from 'angular2/http';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Promise = protractor.promise.Promise;
import {SafeMethodCall} from "../../../node_modules/angular2/ts/src/core/change_detection/parser/ast";


@Injectable()
export class SensorDataService {

  private socket:any;

  sensordatas$: Observable<Array<SensorData>>;

  private _sensordatasObserver: any;

  private _dataStore: {
    sensordatas: Array<SensorData>
  };

  constructor(private http:Http) {
    this.sensordatas$ = new Observable(observer =>
      this._sensordatasObserver = observer).share();

      this._dataStore = { sensordatas: []};

      this.socket = require('socket.io-client')('http://localhost:3001/');

  }

  getData(sens_id:number){

    console.log("SensordataService -> loadsensor data")
    this.http.get('http://127.0.0.1:3001/api/Sensdatas?filter[where][sens_id]='+sens_id+'&filter[limit]=100&filter[order]=received%20DESC')
      .map(res => res.json() )
      .subscribe(
        data=>{
          this._dataStore.sensordatas=[];
          data.forEach(en =>{
            this._dataStore.sensordatas.push(new SensorData(en.sens_id,new Date(en.received),en.val));
          });
           this._sensordatasObserver.next(this._dataStore.sensordatas);
        },
        err =>{
          console.log(err)
        }
      )
  }

  getLatest(sens_id:number){
    console.log("SensordataService -> loadsensor data");

    return this.http.get('http://127.0.0.1:3001/api/Sensdatas?filter[where][sens_id]='+sens_id+'&filter[limit]=1&filter[order]=received%20DESC')
          .map(res=>res.json());
  }

  getAggregateByDate(sens_id:number,start_dt:Date,end_dt:Date){
    return this.http.get('http://127.0.0.1:3001/api/Sensdatas/gethourstats?sens_id='+sens_id+'&start_dt='+start_dt+'&end_dt='+end_dt)
        .map(res => res.json());
  }


}
