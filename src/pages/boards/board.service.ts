import { BoardModel } from "./board.model";

export class BoardService {
  boardsArr: BoardModel[] = [];

  constructor(){}

  getBoards(): Array<BoardModel> {

    this.boardsArr.push(new BoardModel("2222", "MyBoard", 4));
    this.boardsArr.push(new BoardModel("2222", "SecondBoard", 4));
    this.boardsArr.push(new BoardModel("2222", "ThirdBoard", 4));

    return this.boardsArr;
  }
}
