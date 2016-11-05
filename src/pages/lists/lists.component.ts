import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from "ionic-angular";

import { TrelloService } from "../../shared/services/trello.service";
import { ListClass } from "../../shared/classes/list.class";
import { Cards } from "../cards/cards.component"

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.component.html',
})
export class Lists {
  boardId: string;
  boardName: string;
  listsArr: ListClass[] = [];

  constructor(private navCtrl: NavController, private params: NavParams, private alertCtrl: AlertController, private trelloService: TrelloService, private toastCtrl: ToastController){}

  ngOnInit(){
    this.boardId = this.params.get("id");
    this.boardName = this.params.get("name");

    this.trelloService.getLists(this.boardId).subscribe( lists => this.listsArr = lists );
  }

  openList(id: string, name: string){
    this.navCtrl.push(Cards, {id: id, name: name});
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
            if (data.name == "" || data.name.length > 100) return false;

            this.trelloService.addList(this.boardId, data.name).subscribe(
              (newList) => {
                /* copy array in order to invoke angulars update function */
                let tempListArr: ListClass[];
                tempListArr = this.listsArr.slice();
                tempListArr.unshift(newList);
                this.listsArr = tempListArr.slice();

                let toast = this.toastCtrl.create({
                  message: 'Die Liste wurde erfolgreich hinzugefügt.',
                  duration: 2200,
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
          value: oldName
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
            if (data.name == "" || data.name == oldName) return false; // do not close alert

            this.trelloService.changeList(listId, data.name).subscribe(
              (changedList) => {
                /* replace the changed object */
                this.listsArr.forEach((value, index) => {
                  if (value.id == listId)
                    this.listsArr[index] = changedList;
                });

                /* copy array in order to invoke angulars update function */
                let tempListArr: ListClass[];
                tempListArr = this.listsArr.slice();
                this.listsArr = tempListArr.slice();

                let toast = this.toastCtrl.create({
                  message: 'Die Liste wurde erfolgreich aktualisiert.',
                  duration: 2200,
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

  closeList(listId: string, name: string) {
    let alert = this.alertCtrl.create({
      title: name + " wirklich archivieren?",
      buttons: [
        {
          text: "Abbrechen",
          role: "Cancel"
        },
        {
          text: "Okay",
          handler: () => {
            this.trelloService.closeList(listId).subscribe(
              () => {
                /* delete the closed object */
                this.listsArr.forEach((value, index) => {
                  if (value.id == listId)
                    this.listsArr.splice(index, 1);
                });

                /* copy array in order to invoke angulars update function */
                let tempListArr: ListClass[];
                tempListArr = this.listsArr.slice();
                this.listsArr = tempListArr.slice();

                let toast = this.toastCtrl.create({
                  message: 'Die Liste wurde erfolgreich archiviert.',
                  duration: 2200,
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
}
