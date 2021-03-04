import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'networkImage'
})
export class NetworkImagePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if(value){
      return `${environment.endpoint}/images/${value}`;
    }
    return 'assets/images/no_photo.jpg';
  }

}
