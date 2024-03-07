import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Muestra } from 'src/app/global/interface/muestras.interface';
import { DetalleMuestra } from 'src/app/global/interface/detalleMuestras.interface';
import { GuardarMuestra } from 'src/app/global/interface/guardaMuestras.interface';

@Injectable({
    providedIn: 'root'
})
export class MuestraService {
    
    private apiUrl = 'https://wsdev.agrosavia.co/apigmlab/api/Muestra/MuestraById/'; 
    private apiDetalleMuestraUrl = 'https://wsdev.agrosavia.co/apigmlab/api/Muestra/MuestraDetalleById/'; 
    private apiGuardarMuestrasUrl = 'https://wsdev.agrosavia.co/apigmlab/api/Muestra/ActualizarEstado'; 

    private headers = new HttpHeaders();
    constructor(private http: HttpClient) { }

    getMuestraByID(idMuestra: string = ''): Observable<Muestra> {
        this.obtenerToken();
        const body = { id: idMuestra };
        return this.http.get<Muestra>(`${this.apiUrl}${idMuestra}`, {headers:this.headers});
    }

    getDetalleMuestraByID(idMuestra: string = ''): Observable<DetalleMuestra> {
        this.obtenerToken();
        const body = { id: idMuestra };
        return this.http.get<DetalleMuestra>(`${this.apiDetalleMuestraUrl}${idMuestra}`, {headers:this.headers});
    }

    putEstadoMuestras(muestras: GuardarMuestra): Observable<GuardarMuestra> {
        this.obtenerToken();
        return this.http.put<GuardarMuestra>(`${this.apiGuardarMuestrasUrl}`,muestras , {headers:this.headers});
    }

    obtenerToken(){
        let tokenId = sessionStorage.getItem('token')
        this.headers = new HttpHeaders({
            'Content-Type': 'application/pdf',
            Authorization: `Bearer ${tokenId}`,
          });                
    }
}