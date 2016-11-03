import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";

import { AlertService } from "../../shared/services/alert.service";
import { TrelloService } from "../../shared/services/trello.service";
import { ListClass } from "../../shared/classes/list.class";

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.component.html',
})
export class Lists {
  boardId: string;
  listsArr: ListClass[] = [];
  showClosed: boolean = false;

  constructor(public params: NavParams, public alert: AlertService, public trelloService: TrelloService){}

  ngOnInit(){
    this.boardId = this.params.get("id");
    this.trelloService.getLists(this.boardId).subscribe( lists => this.listsArr = lists );

    this.alert.showAlert("hh", "", "HALLO",
      [
        {
          text: "ciao",
          handler: () => { console.log("ok"); }
        }
      ]
    );
  }
}
