import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    
    private apiUrl = 'https://wsdev.agrosavia.co/apigmlab/api/Auth/login'; 

    constructor(private http: HttpClient) { }

    login(username: string = '', password: string = ''): Observable<any> {
        const body = { user: username, password : password };
        return this.http.post(this.apiUrl,body);
    }
}