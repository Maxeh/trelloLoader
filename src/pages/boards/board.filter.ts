import { Pipe, PipeTransform } from '@angular/core';

import { BoardClass } from "../../shared/classes/board.class";

@Pipe({
  name: 'FilterBoard'
})
export class FilterBoard implements PipeTransform {
  transform(items: Array<BoardClass>, showClosed: boolean, searchTerm:string): Array<BoardClass> {
    return items.filter(item => ((showClosed || !item.closed ) && (item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1)) );
  }
}
