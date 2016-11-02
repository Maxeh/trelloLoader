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
  showClosed: boolean = false;

  constructor(private navCtrl: NavController, private trelloService: TrelloService, private boardService: BoardService) { }

  ngOnInit(){
    if (localStorage.getItem("trello_token")){
      this.trelloAuthorized = true;
      this.boardService.getBoards().subscribe( boards => this.boardsArr = boards );
    }
    else {
      this.trelloService.trelloAuthorize();
    }
  }

  onSearch(e:string){

  }

  // additional check for authorization
  ionViewCanLeave(): boolean {
    return this.trelloAuthorized;
  }
}
