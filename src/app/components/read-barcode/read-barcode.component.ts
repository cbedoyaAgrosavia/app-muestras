import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, NavController } from '@ionic/angular';
import { DetalleMuestra } from 'src/app/global/interface/detalleMuestras.interface';
import { GuardarMuestra } from 'src/app/global/interface/guardaMuestras.interface';
import { MuestraService } from 'src/services/muestra.service';

@Component({
  selector: 'app-read-barcode',
  templateUrl: './read-barcode.component.html',
  styleUrls: ['./read-barcode.component.scss'],
})
export class ReadBarcodeComponent {

  scanResult: any;
  estadoMuestraInicial: string = '';
  guardarMuestra: GuardarMuestra;
  descripcionMuestraInicial: string = '';
  estadoMuestraSiguiente: string = '';
  detalleMuestra: DetalleMuestra;
  numeroMuestras: number = 0;
  muestrasTomadas: string[] = [];

  constructor(private __muestraService: MuestraService,
    private alertController: AlertController,
    private navCtrl: NavController) { }

  qrCodeString = '';

  setResult(ev: Event) {
    console.log(`Dismissed with role: ${ev}`);
  }

  startScan = async () => {
    await BarcodeScanner.checkPermission({ force: true });

    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      if (this.numeroMuestras === 0) {
        this.numeroMuestras += 1;
        this.consultarMuestraInicial(result.content);
        this.muestrasTomadas.push(result.content);
      } else {
        this.consultarMuestraSiguiente(result.content);
      }
    }
  }

  consultarMuestraInicial(muestraId: string) {
    this.__muestraService.getMuestraByID(muestraId).subscribe({
      next: (data) => {
        this.estadoMuestraInicial = data.data.estado;
        this.descripcionMuestraInicial = data.data.estadoDescripcion;
      },
      error(err) {
        console.log(err)
      },
    })
  }

  consultarMuestraSiguiente(muestraId: string) {
    this.__muestraService.getMuestraByID(muestraId).subscribe({
      next: (data) => {
        this.estadoMuestraSiguiente = data.data.estado;
        if (this.estadoMuestraInicial === this.estadoMuestraSiguiente) {
          this.numeroMuestras += 1;
          this.muestrasTomadas.push(muestraId);
        } else {
          this.alertaMuestraDiferenEstado(muestraId);
        }
      },
      error(err) {
        console.log(err)
      },
    })
  }

  save = async () => {
    const alert = await this.alertController.create({
      message: 'Desea guardar la(s) muestra(s).',
      buttons: [
        {
          text: 'Guardar',
          role: 'guardar',
        },
        {
          text: 'Cancelar',
          role: 'cancelar',
        },
      ],

    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    if(role === 'guardar'){
      this.crearObjetoMuestras();
      this.__muestraService.putEstadoMuestras(this.guardarMuestra).subscribe({
        next: (data) => {
          
        },
        error(err) {
          console.log(err)
        },
      })      
    }

  }

  crearObjetoMuestras(){
    this.guardarMuestra = {
      muestras : this.muestrasTomadas,
      estado : this.estadoMuestraInicial
    }
  }

  alertaMuestraDiferenEstado = async (muestraId:string) => {
    const alert = await this.alertController.create({
      message: `La muestra ${muestraId} no se encuentra en el estado recibido en laboratorio, se encuentra en Inicio Secado.`,
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancelar',
        },
      ],

    });

    await alert.present();

    // Esperar hasta que la alerta se cierre
    const { role } = await alert.onDidDismiss();    
  }

  eliminarMuestra(indexMuestraId: number){
    this.muestrasTomadas.splice(indexMuestraId,1)
  }

  verDetalleMuestra(muestraId: string){
  this.obtenerDetalleMuestra(muestraId);
  }

  obtenerDetalleMuestra(muestraId: string){
    this.__muestraService.getDetalleMuestraByID(muestraId).subscribe({
      next: (data) => {
        this.detalleMuestra = data;
        this.navCtrl.navigateForward('/detalles', {
          queryParams: {
            objeto: JSON.stringify(this.detalleMuestra) // Convertir el objeto a una cadena JSON
          }
        });            
      },
      error(err) {
        console.log(err)
      },
    })
  }

  

}
