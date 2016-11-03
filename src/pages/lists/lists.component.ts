import { Component } from '@angular/core';
import {NavParams, AlertController, ToastController} from "ionic-angular";

import { TrelloService } from "../../shared/services/trello.service";
import { ListClass } from "../../shared/classes/list.class";

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.component.html',
})
export class Lists {
  boardId: string;
  boardName: string;
  listsArr: ListClass[] = [];

  constructor(public params: NavParams, public alertCtrl: AlertController, public trelloService: TrelloService, private toastCtrl: ToastController){}

  ngOnInit(){
    this.boardId = this.params.get("id");
    this.boardName = this.params.get("name");

    this.trelloService.getLists(this.boardId).subscribe( lists => this.listsArr = lists );
  }

  addList() {
    let alert = this.alertCtrl.create({
      title: "Name eingeben",
      inputs: [
        {
          name: "name"
        }
      ],
      buttons: [
        {
          text: "Abbrechen",
          role: "Cancel"
        },
        {
          text: "Okay",
          handler: (data) => {
            this.trelloService.addList(this.boardId, data.name).subscribe(
              () => {
                this.trelloService.getLists(this.boardId).subscribe(lists => this.listsArr = lists);
                let toast = this.toastCtrl.create({
                  message: 'Die Liste wurde erfolgreich hinzugefügt.',
                  duration: 2500,
                  position: "top"
                });
                toast.present();
              }
            );
          }
        }
      ]
    });
    alert.present();
  }

  changeList(listId: string, oldName: string) {
    let alert = this.alertCtrl.create({
      title: "Name ändern",
      inputs: [
        {
          name: "name",
          placeholder: oldName
        }
      ],
      buttons: [
        {
          text: "Abbrechen",
          role: "Cancel"
        },
        {
          text: "Okay",
          handler: (data) => {
            if (data.name == "") return false; // do not close alert
            if (data.name == oldName) return true; // close alert, but do not change anything


          }
        }
      ]
    });
    alert.present();
  }
}
