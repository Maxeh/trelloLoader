import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BoardModel } from "./board.model";
import { TrelloService } from "./trello.service";
import { BoardService } from './board.service';


@Component({
  selector: 'page-boards',
  templateUrl: 'boards.component.html',
  providers: [ TrelloService, BoardService ]
})
export class Boards {
  trelloAuthorized: boolean = false;
  boardsArr: BoardModel[] = [];

  constructor(public navCtrl: NavController, public trelloService: TrelloService, public boardService: BoardService) { }

  ngOnInit(){
    if (localStorage.getItem("trello_token")){
      this.trelloAuthorized = true;
      this.boardsArr = this.boardService.getBoards();
    }
    else {
      this.trelloService.trelloAuthorize();
    }
  }
}
