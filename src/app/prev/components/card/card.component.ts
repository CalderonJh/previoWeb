import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Gusto {
  nombre: string;
  porcentaje: number | 0;
  esEditable?: boolean;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: ``,
})
export class CardComponent implements OnInit{
  nombre!: string;
  correo!: string;
  telefono!: string | number;
  gustos: Gusto[] = [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.nombre = params['nombre'];
      this.correo = params['correo'];
      this.telefono = params['telefono'];
      this.gustos = JSON.parse(params['gustos']);
    });
  }
}
