import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(productList: any, term: any) {
    return productList.filter((p: any) =>
      p.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
