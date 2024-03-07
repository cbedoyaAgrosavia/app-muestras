import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  formLogin: FormGroup;

  constructor(private router: Router,
    private __loginService: LoginService,
    private fb: FormBuilder) {

    this.formLogin = fb.group({
      'usuario': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    })

  }

  login() {
    let usuarioFormulario: string = this.formLogin.get('usuario')?.value!;
    let passwordFormulario: string = this.formLogin.get('password')?.value!;
    this.__loginService.login(usuarioFormulario, passwordFormulario).subscribe({
      next: data => {
        sessionStorage.setItem('token', data.data.token);
        this.router.navigate(['/home']);
      },
      error: error => { console.error('Error al momento de loguearse', error); }
    })
  }


}
