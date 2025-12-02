import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [NgIf ,ReactiveFormsModule]
})
export class LoginComponent {
  
  form: FormGroup;
  erro: string = '';
  sucesso: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      senha: ['', Validators.required],
      autoLogin: [false]
    });
  }

  login() {
    this.erro = '';
    this.sucesso = '';

    if (this.form.invalid) {
      this.erro = "Preencha todos os campos!";
      return;
    }

    const dados = {
      nome: this.form.value.nome,
      senha: this.form.value.senha
    };

    this.http.post('http://localhost:3001/login', dados)
    .subscribe({
      next: (res: any) => {
        this.sucesso = "Login realizado com sucesso!";

        // salva login automático se marcado
        if (this.form.value.autoLogin) {
          localStorage.setItem("usuario", JSON.stringify(res));
        }

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 800);
      },

      error: (err) => {
        this.erro = err.error?.message || "Erro inesperado!";
      }
    });
  }

  entrar(email: string, senha: string) {
    const emailVal = (email || '').trim();
    const senhaVal = (senha || '').trim();

    // Ajuste os valores abaixo para as credenciais "corretas" do seu app
    const EMAIL_CORRETO = 'usuario@exemplo.com';
    const SENHA_CORRETA = 'senha123';

    if (emailVal === EMAIL_CORRETO && senhaVal === SENHA_CORRETA) {
      this.router.navigate(['/home']);
    } else {
      alert('Email ou senha incorretos');
    }
  }
}
