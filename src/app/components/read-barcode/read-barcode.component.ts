import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-read-barcode',
  templateUrl: './read-barcode.component.html',
  styleUrls: ['./read-barcode.component.scss'],
})
export class ReadBarcodeComponent  {


  constructor(private barcodeScanner: BarcodeScanner) { }

  scanCode() {
    console.log('ss')
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        alert("Barcode data " + JSON.stringify(barcodeData));
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

}
