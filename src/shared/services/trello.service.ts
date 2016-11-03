import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs";

import { BoardClass } from "../classes/board.class";
import { ListClass } from "../classes/list.class";


@Injectable()
export class TrelloService {
  apiKey: string = "05ece72ef5033e3e3af96c9846ad64e3";
  token: string;

  constructor(private http: Http){
    this.token = localStorage.getItem("trello_token");
  }

  getBoards(): Observable<BoardClass[]> {
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

  getLists(id: string): Observable<ListClass[]> {
    let url = "https://api.trello.com/1/boards/" + id + "/lists?key=" + this.apiKey + "&token=" + this.token;
    return this.http.get(url)
      .map(
        (res: Response) => {
          let data = res.json();
          let listsArr: ListClass[] = [];
          for (let i = 0; i < data.length; i++) {
            listsArr.push(new ListClass(data[i].id, data[i].name, data[i].closed))
          }
          return listsArr || [];
        })
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