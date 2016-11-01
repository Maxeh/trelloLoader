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

  constructor(private navCtrl: NavController, private trelloService: TrelloService, private boardService: BoardService) { }

  ngOnInit(){
    //alert("comp");
    if (localStorage.getItem("trello_token")){
      this.trelloAuthorized = true;
      this.boardService.getBoards().subscribe( boards => this.boardsArr = boards );
    }
    else {
      this.trelloService.trelloAuthorize();
    }
  }
}
