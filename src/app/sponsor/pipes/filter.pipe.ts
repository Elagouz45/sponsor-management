import {Pipe, PipeTransform} from '@angular/core';
import {Sponsor} from "../interfaces/sponsor";

@Pipe({
  name: 'tableFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any, searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.data.filter((item: any) => {
      const propertyValue = item.value.sponsor_name.toLowerCase();
      return propertyValue.includes(searchText);
    });
  }
}
