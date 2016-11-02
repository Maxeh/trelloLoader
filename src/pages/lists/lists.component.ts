import { Component } from '@angular/core';
import {NavParams} from "ionic-angular";

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.component.html',
  providers: [ ]
})
export class Lists {

  boardId: string;

  constructor(public params: NavParams){}

  ngOnInit(){
    this.boardId = this.params.get("id");
  }
}
