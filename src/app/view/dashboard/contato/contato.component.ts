import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-contato',
  imports: [RouterLink, RouterLinkActive, FormsModule, NgIf],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  menuAberto: boolean = false;

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  enviarFormulario() {
    const nome = (document.querySelector('input[name="nome"]') as HTMLInputElement).value;
    const email = (document.querySelector('input[name="email"]') as HTMLInputElement).value;
    const cpf = (document.querySelector('input[name="cpf"]') as HTMLInputElement).value;
    const sobrenome = (document.querySelector('input[name="sobrenome"]') as HTMLInputElement).value;
    const telefone = (document.querySelector('input[name="telefone"]') as HTMLInputElement).value;
    const contato = (document.querySelector('select[name="contato"]') as HTMLSelectElement).value;

    console.log("📌 Dados enviados:");
    console.log("Nome:", nome);
    console.log("Email:", email);
    console.log("CPF:", cpf);
    console.log("Sobrenome:", sobrenome);
    console.log("Telefone:", telefone);
    console.log("Contato preferido:", contato);

    alert("Dados enviados! Veja no console.");
  }
}
