/**
 * Created by andreaterzani on 23/02/16.
 */
import {Component,Input,SimpleChange,OnChanges} from 'angular2/core';

let d3 = require('d3');
let MG = require('metrics-graphics');

require('metrics-graphics/dist/metricsgraphics.css');


@Component({
  selector:'metricg',
  template : '<div id="mgc"></div>'
})

export class MetricsGraph implements OnChanges{

  @Input() data:Array<any>=[];
  @Input() title:string="";
  @Input() description:string="";


  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {

    if(changes['data']){
        if(this.data.length > 1){
            MG.data_graphic({
              title: this.title,
              description: this.description,
              animate_on_load: true,
              data: this.data,
              width: 800,
              height: 400,
              target: ('#mgc'),
              x_accessor: 'date',
              y_accessor: 'value'
            });
        }
    }

  }

}
