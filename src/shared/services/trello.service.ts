import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs";

import { BoardClass } from "../classes/board.class";
import { ListClass } from "../classes/list.class";
import { CardClass } from "../classes/card.class";


@Injectable()
export class TrelloService {
  apiKey: string = "05ece72ef5033e3e3af96c9846ad64e3";
  token: string;

  constructor(private http: Http){
    this.token = localStorage.getItem("trello_token");
  }

  getCards(listId: string){
    let url = "https://api.trello.com/1/lists/" + listId + "/cards?key=" + this.apiKey + "&token=" + this.token;
    return this.http.get(url)
      .map(
        (res: Response) => {
          let data = res.json();
          let cardsArr: CardClass[] = [];
          for (let i = 0; i < data.length; i++){
            cardsArr.push(new CardClass(data[i].id, data[i].name, data[i].desc, data[i].closed))
          }
          return cardsArr || [ ];
        }
      )
      .catch(this.handleError);
  }

  getBoards() {
    let url = "https://api.trello.com/1/members/me/boards?key=" + this.apiKey + "&token=" + this.token;
    return this.http.get(url)
      .map(
        (res: Response) => {
          let data = res.json();
          let boardsArr: BoardClass[] = [];
          for (let i = 0; i < data.length; i++){
            boardsArr.push(new BoardClass(data[i].id, data[i].name, data[i].memberships.length, data[i].closed))
          }
          return boardsArr || [ ];
        }
      )
      .catch(this.handleError);
  }

  getLists(id: string) {
    let url = "https://api.trello.com/1/boards/" + id + "/lists?key=" + this.apiKey + "&token=" + this.token;
    return this.http.get(url)
      .map(
        (res: Response) => {
          let data = res.json();
          let listsArr: ListClass[] = [];
          for (let i = 0; i < data.length; i++) {
            listsArr.push(new ListClass(data[i].id, data[i].name))
          }
          return listsArr || [];
        })
      .catch(this.handleError);
  }

  addList(idBoard: string, name: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.trello.com/1/lists/";

    return this.http.post(url, {name: name, idBoard: idBoard, key: this.apiKey, token: this.token}, options)
      .map(
        (res: Response) => {
          let data = res.json();
          return new ListClass(data.id, data.name);
        }
      )
      .catch(this.handleError);
  }

  changeList(idList: string, name: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.trello.com/1/lists/" + idList;

    return this.http.put(url, {name: name, key: this.apiKey, token: this.token}, options)
      .map(
        (res: Response) => {
          let data = res.json();
          return new ListClass(data.id, data.name);
        }
      )
      .catch(this.handleError);
  }

  closeList(idList: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.trello.com/1/lists/" + idList + "/closed";

    return this.http.put(url, {value: true, key: this.apiKey, token: this.token}, options)
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
