/**
 * Created by andreaterzani on 23/02/16.
 */
import {Component,Input,OnChanges,SimpleChange} from 'angular2/core';
import {SensorData} from "./sensordata";
import {TimeAgoPipe} from 'angular2-moment';

@Component({
  selector:'latest-data',
  pipes:[TimeAgoPipe],
  template: `

              <div class="row">
                <div class="col-md-2">
                     <div class="card">
                  Latest : {{value}}
                  Received : <time>{{received | amTimeAgo}}</time>
                      </div>
              </div>
            </div>

  `
})

export class LatestData implements OnChanges{

  @Input() data:SensorData  = new SensorData();

  public value:string ='';
  public received :Date = new Date();

  constructor(){
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {

    if(changes['data']) {
      if(this.data) {
        this.value = this.data.val;
        this.received = this.data.created;
      }
    }
  }

}
