import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleMuestra } from 'src/app/global/interface/detalleMuestras.interface';

@Component({
  selector: 'app-detalles-muestra',
  templateUrl: './detalles-muestra.component.html',
  styleUrls: ['./detalles-muestra.component.scss'],
})
export class DetallesMuestraComponent  implements OnInit {

  detalleMuestra: DetalleMuestra;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        console.log(params)
        this.detalleMuestra = JSON.parse(params["objeto"]); // Convertir la cadena JSON de nuevo a objeto
      }
    });    
  }

}
