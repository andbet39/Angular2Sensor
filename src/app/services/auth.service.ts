import {Component} from 'angular2/core';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Http,HTTP_PROVIDERS,Headers} from 'angular2/http';
import {User} from './user';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AuthService {

  loggeduser$:Observable<User>;

  public loggedUser:User;

  private _loggeduserObserver:any;

  public _dataStore: {
    loggeduser:User
  };


  constructor(private http:Http){

    this.loggeduser$ = new Observable(observer =>
      this._loggeduserObserver = observer).share();
  }

  login(user:User){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json ; charset=utf-8');


    this.http.post('http://127.0.0.1:3001/api/users/login/', JSON.stringify(user), {headers: headers})
      .map(res => res.json())
      .subscribe(
        data =>{
          this.loggedUser = new User(data.email,data.password,data.id);

          this._dataStore.loggeduser = new User(data.email,data.password,data.id);
          if(this._loggeduserObserver)
            this._loggeduserObserver.next(this._dataStore.loggeduser);
      },
        err=> console.log(err)
      )

  }




}
