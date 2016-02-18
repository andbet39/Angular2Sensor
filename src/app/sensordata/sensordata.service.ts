import {SensorData} from './sensordata';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

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

  constructor() {
    this.sensordatas$ = new Observable(observer =>
      this._sensordatasObserver = observer).share();

      this._dataStore = { sensordatas: []};

      this.socket = require('socket.io-client')('http://localhost:3001/');

  }





}
