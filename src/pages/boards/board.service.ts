import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs";

import { BoardModel } from "./board.model";

@Injectable()
export class BoardService {
  apiKey: string = "05ece72ef5033e3e3af96c9846ad64e3";
  token: string;
  url: string;

  constructor(private http: Http){
    this.token = localStorage.getItem("trello_token");
    this.url = "https://api.trello.com/1/members/me/boards?key=" + this.apiKey + "&token=" + this.token;
  }

  getBoards(): Observable<BoardModel[]> {
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let data = res.json();
    let boardsArr: BoardModel[] = [];
    for (let i = 0; i < data.length; i++){
      boardsArr.push(new BoardModel(data[i].id, data[i].name, data[i].memberships.length, data[i].closed))
    }
    return boardsArr || [ ];
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
