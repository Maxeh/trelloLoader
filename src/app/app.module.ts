import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Boards } from '../pages/boards/boards.component';
import { Settings } from '../pages/settings/settings.component';

@NgModule({
  declarations: [
    MyApp,
    Boards,
    Settings
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Boards,
    Settings
  ],
  providers: []
})
export class AppModule {}
