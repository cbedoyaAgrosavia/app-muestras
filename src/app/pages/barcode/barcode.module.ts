import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarcodePageRoutingModule } from './barcode-routing.module';

import { BarcodePage } from './barcode.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ReadBarcodeComponent } from 'src/app/components/read-barcode/read-barcode.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarcodePageRoutingModule,
  ],
  providers: [
    BarcodeScanner,
  ],
  declarations: [BarcodePage, ReadBarcodeComponent]
})
export class BarcodePageModule {}
