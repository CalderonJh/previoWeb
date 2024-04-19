import { Component, ElementRef, ViewChild } from '@angular/core';
import { ValidationService } from '../../services/validation.service';

interface Gusto {
  nombre: string;
  porcentaje: number | 0;
  esEditable?: boolean;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  // @ViewChild(FormComponent) formComponent!: FormComponent;
  @ViewChild('gustoInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('porcentajeInput') porcentajeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('errorNombre') errorNombre!: ElementRef<HTMLParagraphElement>;
  @ViewChild('errorCorreo') errorCorreo!: ElementRef<HTMLParagraphElement>;
  @ViewChild('errorTelefono') errorTelefono!: ElementRef<HTMLParagraphElement>;
  @ViewChild('submitBtn') submitBtn!: ElementRef<HTMLButtonElement>;

  editando: boolean = false;
  nombre: string = '';
  correo: string = '';
  telefono: string = '';

  _gustos: Gusto[] = [
    { nombre: 'Chocolate', porcentaje: 50, esEditable: false },
    { nombre: 'Vainilla', porcentaje: 30, esEditable: false },
    { nombre: 'Fresa', porcentaje: 20, esEditable: false },
  ];

  originalGustos: Gusto[] = [];

  constructor(private validationService: ValidationService) {}

  agregarGusto() {
    let value = this.tagInput.nativeElement.value;
    value = value.trim();
    if (!value) return;

    const porcentaje = parseInt(this.porcentajeInput.nativeElement.value) || 0;
    if (porcentaje < 0 || porcentaje > 100) return;
    if (this._gustos.find((gusto) => gusto.nombre === value)) return;
    this._gustos.unshift({ nombre: value, porcentaje, esEditable: false });
  }

  onSubmit() {
    // event.preventDefault();
    this.validarNombre();
    this.validarCorreo();
    this.validarTelefono();
    // this.validarNombre();
  }



  onEdit(gusto: Gusto) {
    gusto.esEditable = !gusto.esEditable;
    this.editando = true;
    this.submitBtn.nativeElement.disabled = true;
    this.originalGustos = JSON.parse(JSON.stringify(this._gustos));
  }

  cancelarEdicion() {
    if (this.originalGustos.length > 0) {
      this._gustos = JSON.parse(JSON.stringify(this.originalGustos));
      this.originalGustos = [];
    }
    this.editando = false;
    this._gustos.forEach((gusto) => (gusto.esEditable = false));
    this.submitBtn.nativeElement.disabled = false;
  }

  guardarCambios() {
    this.originalGustos = [];
    this.cancelarEdicion();
  }

  validarNombre() {
    const error = this.validationService.nameError(this.nombre);
    console.log(error);
    this.mostrarError(error, this.errorNombre.nativeElement);
  }

  validarCorreo() {
    const error = this.validationService.emailError(this.correo);
    this.mostrarError(error, this.errorCorreo.nativeElement);
  }

  validarTelefono() {
    const error = this.validationService.telefonoError(this.telefono);
    this.mostrarError(error, this.errorTelefono.nativeElement);
  }
  mostrarError(err: string, error: HTMLParagraphElement) {
    if (err !== this.validationService.NO_ERROR) {
      error.textContent = err;
      error.classList.remove('hidden');
    } else error.classList.add('hidden');
  }

  onNombreChange(nombre: string) {
    this.nombre = nombre;
  }
  onCorreoChange(correo: string) {
    this.correo = correo;
  }
  onTelefonoChange(telefono: string) {
    this.telefono = telefono;
  }
}
