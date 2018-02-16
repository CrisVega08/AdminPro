import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PipesModule } from '../pipes/pipes.module';

import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,
    //NopagefoundComponent,
    SidebarComponent,
  ],
  exports: [
    HeaderComponent,
    BreadcrumbsComponent,
    //NopagefoundComponent,
    SidebarComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    PipesModule
  ]
})
export class SharedModule { }