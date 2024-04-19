import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  NO_ERROR = "NO_ERROR";
  nameError (name:string): string {
    name = name.trim();
    if (!name) return "Escriba un nombre";
    if (/\d/.test(name)) return "El nombre no puede contener números";
    if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/.test(name))
      return "Solo letras y espacios son permitidos";
    if (name.length < 3) return "Nombre muy corto";
    if (name.length > 20) return "Nombre muy largo";
    return this.NO_ERROR;
  };

  telefonoError (telefono:string): string {
    if (!telefono) return "Número de teléfono es requerido";
    if (!/^[0-9+]*$/.test(telefono)) return "Solo números son permitidos";

    if (telefono.length < 7) return "Número de teléfono demasiado corto";
    if (telefono.length > 12) return "Número de teléfono demasiado largo";
    return this.NO_ERROR;
  };

  emailError (email:string): string {
    if (!email) return "Email es requerido";
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/))
      return "Correo electrónico inválido";
    return this.NO_ERROR;
  };
}
