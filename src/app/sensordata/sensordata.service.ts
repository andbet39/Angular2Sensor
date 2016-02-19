import {SensorData} from './sensordata';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http,HTTP_PROVIDERS,Headers} from 'angular2/http';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';


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
    this.http.get('http://127.0.0.1:3001/api/Sensdatas?filter[where][sens_id]='+sens_id+'&filter[limit]=200&filter[order]=received%20DESC')
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





}
