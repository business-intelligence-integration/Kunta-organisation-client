import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiRoutingModule } from './ui-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
// import { TooltipModule } from 'ng2-tooltip-directive';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    UiRoutingModule,
    // TooltipModule
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class UiModule { }
