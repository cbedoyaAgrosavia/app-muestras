import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoBasicPageRoutingModule } from './info-basic-routing.module';

import { InfoBasicPage } from './info-basic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoBasicPageRoutingModule
  ],
  declarations: [InfoBasicPage]
})
export class InfoBasicPageModule {}
