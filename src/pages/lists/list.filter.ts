import { Pipe, PipeTransform } from '@angular/core';

import { ListClass } from "../../shared/classes/list.class";

@Pipe({
  name: 'FilterList'
})
export class FilterList implements PipeTransform {
  transform(items: Array<ListClass>, searchTerm:string): Array<ListClass> {
    return items.filter(item => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1);
  }
}
