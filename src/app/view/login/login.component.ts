import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AutenticacaoService, private router: Router) { }

  Lembrar() {
    this.login.lembrar = !this.login.lembrar;
  }
  formloga() {
    console.log(this.login);
    this.authService.autenticar(this.login.login, this.login.senha, this.login.lembrar)
      .subscribe({
        next: () => {
          console.log('Usuário autenticado com sucesso!');
          this.router.navigate(['/home']); 
        },
        error: (error) => {
          console.error('Erro na autenticação:', error);
          alert('Usuário ou senha inválidos.');
        }
      });
  }
  login: Usuario = {
    login: '',
    senha: '',
    lembrar: false
  }
}