import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function validaDV(rut: string) {
  // Se separa el número del dígito verificador
  const [numero, dv] = rut.replace('-K', '-k').split('-');

  // Aquí se debe aplicar módulo 11. La función se extrajo de:
  // https://validarutchile.cl/calcular-rut-en-javascript.php
  // ! OJO: Es una función que se llama a sí misma.
  const dvVer = ((T: number): string => {
    let M = 0,
      S = 1;
    for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
    return S ? (S - 1).toString() : 'k';
  })(Number.parseInt(numero));

  // Se compara el dígito verificador calculado con el ingresado
  return dvVer == dv;
}

/**
 * Función que valida que dos campos de contraseña sean iguales
 * @param control Control que contiene el campo de confirmación de contraseña
 * @returns Objeto con la validación o nulo si es válida
 */
export const passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.parent?.get('password')?.value;
    const confirmPassword = control.value;

    return password && confirmPassword && password === confirmPassword
      ? null
      : { passwordConfirm: true };
  };

/**
 * Función que valida el formato y dígito verificador de un RUT
 * @param control Control que contiene el RUT a validar
 * @returns Objeto con la validación o nulo si es válida
 */
export const rutValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const rut = control.value;
  if (!rut) {
    return null;
  }
  const dvValid = validaDV(rut);
  const formatValid = /^[0-9]{7,8}-[0-9Kk]{1}$/.test(rut);
  return formatValid ? (dvValid ? null : { rutDv: true }) : { rutFormat: true };
};
