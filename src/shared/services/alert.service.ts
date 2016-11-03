import {AlertController} from "ionic-angular";
import {Injectable} from "@angular/core";

@Injectable()
export class AlertService {

  constructor(private alertCtrl: AlertController){ }

  showAlert(title:string, subTitle:string, message:string, buttons:any[]) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      message: message,
      buttons: buttons
    });
    alert.present();
  }
}
