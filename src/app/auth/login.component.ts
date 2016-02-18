import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Http,HTTP_PROVIDERS,Headers} from 'angular2/http';
import {User} from '../services/user';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'login-form',
  providers: [ ...FORM_PROVIDERS ],
  directives: [ ...ROUTER_DIRECTIVES],
  pipes: [],
  template:`
    <div>

       <form class="col-md-4" (submit)="onSubmit()" #loginForm="ngForm" >


    <fieldset class="form-group">
      <label for="email">Email</label>
      <input type="text" id="email" [(ngModel)]="user.email" class="form-control"   ngControl="email" >
    </fieldset>

    <fieldset class="form-group">
      <label for="description">Password</label>
      <input type="text" id="password" [(ngModel)]="user.password" class="form-control"   ngControl="password" >
    </fieldset>

    <button type="submit" class="btn btn-primary" [disabled]="!loginForm.form.valid" >Submit</button>

  </form>
{{diagnostic}}
    </div>
  `
})

export class LoginFormComponent {

  public user:User = new User('','','');

  onSubmit(){
    this.authService.login(this.user);
  }

  constructor(private authService:AuthService) {

  }

  get diagnostic (){
    return JSON.stringify(this.user);
  }

}
