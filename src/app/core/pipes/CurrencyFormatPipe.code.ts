import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyFormat' })
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number): string {
    return value ? `${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA` : '0.00 FCFA';
  }
}