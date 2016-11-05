import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { Boards } from '../pages/boards/boards.component';
import { FilterBoard } from '../pages/boards/board.filter';

import { Lists } from '../pages/lists/lists.component';
import { FilterList } from '../pages/lists/list.filter';

import { Cards } from '../pages/cards/cards.component';

import { Settings } from '../pages/settings/settings.component';

// global services
import { TrelloAuthService } from "../shared/services/trelloAuth.service";
import { TrelloService } from "../shared/services/trello.service";


@NgModule({
  declarations: [
    MyApp,
    Boards,
    Lists,
    Cards,
    Settings,
    FilterBoard,
    FilterList
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Boards,
    Lists,
    Cards,
    Settings
  ],
  providers: [
    TrelloAuthService,
    TrelloService
  ]
})
export class AppModule {}
