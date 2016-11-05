import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { TrelloService } from '../../shared/services/trello.service'
import { CardClass } from "../../shared/classes/card.class";


@Component({
  selector: 'page-cards',
  templateUrl: 'cards.component.html'
})

export class Cards {
  listId: string;
  listName: string;
  cardsArr: CardClass[] = [];

  constructor(private params: NavParams, private trelloService: TrelloService) { }

  ngOnInit(){
    this.listId = this.params.get("id");
    this.listName = this.params.get("name");

    this.trelloService.getCards(this.listId);
  }

}
