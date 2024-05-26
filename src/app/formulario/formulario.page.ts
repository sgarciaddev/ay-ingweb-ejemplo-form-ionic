import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormError, mensajesErr } from '../misc/form-errors';
import { passwordMatchValidator, rutValidator } from '../misc/form-validators';
import { RegionesService } from '../misc/regiones.service';

interface Region {
  id: string;
  nombre: string;
  valor: number;
  comunas: string[];
}
 
@Component({
  selector: 'app-formulario',
  templateUrl: 'formulario.page.html',
})
export class FormularioPage {
  formulario: FormGroup;

  regiones: Region[] = [];
  comunas: string[] = [];

  constructor(private fb: FormBuilder, private regionService: RegionesService) {
    // Se inicializa el formulario con los campos requeridos y las validaciones
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      rut: ['', [Validators.required, rutValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      passwordConfirm: ['', [Validators.required, passwordMatchValidator]],
      region: ['', Validators.required],
      comuna: [{value: '', disabled: true}, Validators.required],
      tyc: [false, Validators.requiredTrue],
    });
  }

  // Se usa el concepto de getter para obtener propiedades calculadas
  // Ver getters en Typescript: https://www.typescriptlang.org/docs/handbook/2/classes.html#getters--setters

  get btnColor() {
    return this.formulario.valid ? 'success' : 'danger';
  }

  get btnText() {
    return this.formulario.valid ? 'Formulario válido' : 'El formulario no es válido';
  }

  // Se obtienen las regiones al iniciar el componente
  ngOnInit() {
    this.regionService.getRegiones().subscribe(data => {
      this.regiones = Object.entries(data.regiones).map(([key, value]) => ({
        id: key,
        nombre: value.nombre,
        valor: value.valor,
        comunas: value.comunas,
        }));
    });
  }

  // Método que se ejecuta al cambiar la región
  onRegionChange() {
    const region = this.formulario.get('region')!.value;
    this.comunas = this.regiones.find(r => r.valor === region)!.comunas;
    if (this.comunas.length > 0) {
      this.formulario.get('comuna')!.enable();
    }
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    console.log(this.formulario.value);
  }

  /**
   * Función que retorna el mensaje de error asociado a un campo del formulario
   * @param campo Campo del formulario (controlado)
   * @returns Mensaje de error asociado al campo, si es que existe
   */
  formError(campo: string): string | null {
    if (this.formulario.get(campo)!.errors) {
      const error: FormError = Object.keys(this.formulario.get(campo)!.errors!)[0] as FormError;
      return mensajesErr[error];
    }
    return null;
  }

}
