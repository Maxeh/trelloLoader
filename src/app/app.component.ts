import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Boards } from '../pages/boards/boards.component';
import { Settings } from '../pages/settings/settings.component';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Boards;
  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform) {
    this.initializeApp();

    this.pages = [
      { title: 'Boards', component: Boards },
      { title: 'Einstellungen', component: Settings }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is("cordova")){
        StatusBar.styleDefault();
        Splashscreen.hide();
      }
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
