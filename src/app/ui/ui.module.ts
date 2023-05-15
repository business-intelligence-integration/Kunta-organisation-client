import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiRoutingModule } from './ui-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    NavbarMobileComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    UiRoutingModule,
    TooltipModule
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    NavbarMobileComponent,
    LoadingComponent
  ]
})
export class UiModule { }
