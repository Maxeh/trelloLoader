import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BoardClass } from "../../shared/classes/board.class";
import { TrelloAuthService } from '../../shared/services/trelloAuth.service';
import { TrelloService } from '../../shared/services/trello.service'
import { Lists } from '../lists/lists.component';


@Component({
  selector: 'page-boards',
  templateUrl: 'boards.component.html'
})
export class Boards {
  trelloAuthorized: boolean = false;
  boardsArr: BoardClass[] = [];
  showClosed: boolean = false;

  constructor(private navCtrl: NavController, private trelloAuthService: TrelloAuthService, private trelloService: TrelloService) { }

  ngOnInit(){
    if (localStorage.getItem("trello_token")){
      this.trelloAuthorized = true;
      this.trelloService.getBoards().subscribe( boards => this.boardsArr = boards );
    }
    else {
      this.trelloAuthService.trelloAuthorize();
    }
  }

  openBoard(id: string){
    this.navCtrl.push(Lists, {id: id});
  }

  // additional check for authorization
  ionViewCanLeave(): boolean {
    return this.trelloAuthorized;
  }
}
