import { Pipe, PipeTransform } from '@angular/core';
import {BoardModel} from "./board.model";

@Pipe({
  name: 'FilterBoard'
})
export class FilterBoard implements PipeTransform {
  transform(items: Array<BoardModel>, showClosed: boolean, searchTerm:string): Array<BoardModel> {
    return items.filter(item => ((showClosed || !item.closed ) && (item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1)) );
  }
}
