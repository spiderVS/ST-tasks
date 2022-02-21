import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercase_custom',
})
export class UppercaseCustomPipe implements PipeTransform {
  transform(value: string): string {
    return `${value.toUpperCase()}`;
  }
}
