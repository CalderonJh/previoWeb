import { Component, ElementRef, ViewChild } from '@angular/core';
import { ValidationService } from '../../services/validation.service';
import { Router } from '@angular/router';

interface Gusto {
  nombre: string;
  porcentaje: number | 0;
  esEditable?: boolean;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  // @ViewChild(FormComponent) formComponent!: FormComponent;
  @ViewChild('gustoInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('porcentajeInput') porcentajeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('errorNombre') errorNombre!: ElementRef<HTMLParagraphElement>;
  @ViewChild('errorCorreo') errorCorreo!: ElementRef<HTMLParagraphElement>;
  @ViewChild('errorTelefono') errorTelefono!: ElementRef<HTMLParagraphElement>;
  @ViewChild('errorGusto') errorGusto!: ElementRef<HTMLParagraphElement>;
  @ViewChild('submitBtn') submitBtn!: ElementRef<HTMLButtonElement>;

  editando: boolean = false;
  nombre: string = '';
  correo: string = '';
  telefono: string = '';

  _gustos: Gusto[] = [

  ];

  originalGustos: Gusto[] = [];

  constructor(
    private router: Router,
    private validationService: ValidationService,
  ) {}

  onSubmit() {
    if (
      !this.validarNombre() ||
      !this.validarCorreo() ||
      !this.validarTelefono()
    ) return;

    this.router.navigate(['/card'], {
      queryParams: {
        nombre: this.nombre,
        correo: this.correo,
        telefono: this.telefono,
        gustos: JSON.stringify(this._gustos),
      },
    });
  }

  agregarGusto() {
    let value = this.tagInput.nativeElement.value;
    value = value.trim();
    if (!value) {
      this.mostrarError(
        'Ingresa algo que te guste',
        this.errorGusto.nativeElement,
      );
      return;
    }
    const porcentaje = parseInt(this.porcentajeInput.nativeElement.value);
    if (isNaN(porcentaje)) {
      this.mostrarError(
        'Ingresa un porcentaje valido',
        this.errorGusto.nativeElement,
      );
      return;
    }
    if (porcentaje < 0 || porcentaje > 100) {
      this.mostrarError(
        'Un valor entre 0 y 100',
        this.errorGusto.nativeElement,
      );
      return;
    }
    if (this._gustos.find((gusto) => gusto.nombre === value)) {
      this.mostrarError(
        'El gusto ya existe',
        this.errorGusto.nativeElement,
      );
      return;
    }
    this.mostrarError('', this.errorGusto.nativeElement);
    this._gustos.unshift({ nombre: value, porcentaje, esEditable: false });
    this.tagInput.nativeElement.value = '';
    this.porcentajeInput.nativeElement.value = '';
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
    return error === this.validationService.NO_ERROR;
  }

  validarCorreo() {
    const error = this.validationService.emailError(this.correo);
    this.mostrarError(error, this.errorCorreo.nativeElement);
    return error === this.validationService.NO_ERROR;
  }

  validarTelefono() {
    const error = this.validationService.telefonoError(this.telefono);
    this.mostrarError(error, this.errorTelefono.nativeElement);
    return error === this.validationService.NO_ERROR;
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
