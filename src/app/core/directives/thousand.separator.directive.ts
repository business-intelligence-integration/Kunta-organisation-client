// import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
// import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

// @Directive({
//   selector: '[thousandSeparator]',
//   providers: [{
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => ThousandSeparatorDirective),
//     multi: true
//   }]
// })
// export class ThousandSeparatorDirective implements ControlValueAccessor {
//   private el: HTMLInputElement;

//   constructor(private elementRef: ElementRef) {
//     this.el = this.elementRef.nativeElement;
//   }

//   @HostListener('input', ['$event.target.value'])
//   onInput(value: string) {
//     const formattedValue = this.formatValue(value);
//     this.onChange(formattedValue.replace(/\s/g, ''));
//     this.el.value = formattedValue;
//   }

//   private formatValue(value: string): string {
//     const cleanValue = value.replace(/[^\d]/g, '');
//     return cleanValue
//       .split('')
//       .reverse()
//       .join('')
//       .match(/.{1,3}/g)
//       ?.join(' ')
//       .split('')
//       .reverse()
//       .join('')
//       .trim() || '';
//   }

//   // ControlValueAccessor implementation
//   onChange: any = () => {};
//   onTouched: any = () => {};

//   writeValue(value: any): void {
//     if (value) {
//       this.el.value = this.formatValue(value.toString());
//     }
//   }

//   registerOnChange(fn: any): void {
//     this.onChange = fn;
//   }

//   registerOnTouched(fn: any): void {
//     this.onTouched = fn;
//   }
// }

import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[thousandSeparator]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ThousandSeparatorDirective),
    multi: true
  }]
})
export class ThousandSeparatorDirective implements ControlValueAccessor {
  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  // Formatage lors de l'input
  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const formattedValue = this.formatValue(value);
    this.updateValues(formattedValue);
  }

  // Formatage lors du blur
  @HostListener('blur')
  onBlur() {
    const value = this.el.value.replace(/\s/g, '');
    this.updateValues(this.formatValue(value));
  }

  private updateValues(formattedValue: string) {
    const numericValue = formattedValue.replace(/\s/g, '');
    this.onChange(numericValue);
    this.el.value = formattedValue;
  }

  private formatValue(value: string): string {
    const cleanValue = value.replace(/[^\d]/g, '');
    return cleanValue
      .split('').reverse().join('')
      .match(/.{1,3}/g)
      ?.join(' ').split('').reverse().join('')
      .trim() || '';
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value) {
      this.el.value = this.formatValue(value.toString());
    }else{
      this.el.value = ''
    }
  }

  onChange: (value: string) => void = () => {};
  registerOnChange(fn: any): void { this.onChange = fn; }

  onTouched: () => void = () => {};
  registerOnTouched(fn: any): void { this.onTouched = fn; }
}