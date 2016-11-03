import { Pipe, PipeTransform } from '@angular/core';

import { ListClass } from "../../shared/classes/list.class";

@Pipe({
  name: 'FilterList'
})
export class FilterList implements PipeTransform {
  transform(items: Array<ListClass>, showClosed: boolean, searchTerm:string): Array<ListClass> {
    return items.filter(item => ((showClosed || !item.closed ) && (item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1)) );
  }
}
