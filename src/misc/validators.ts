import { FormularioInput } from "../pages/Formulario";

function validaDV(rut: string) {
  // Se separa el número del dígito verificador
  const [numero, dv] = rut.replace("-K", "-k").split("-");

  // Aquí se debe aplicar módulo 11. La función se extrajo de:
  // https://validarutchile.cl/calcular-rut-en-javascript.php
  // ! OJO: Es una función que se llama a sí misma.
  const dvVer = ((T: number): string => {
    let M = 0,
      S = 1;
    for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
    return S ? (S - 1).toString() : "k";
  })(Number.parseInt(numero));

  // Se compara el dígito verificador calculado con el ingresado
  return dvVer == dv;
}

export const rutValidator = (rut: string): boolean | string => {
  if (!rut) return "El RUT es requerido";
  const formatValid = /^[0-9]{7,8}-[0-9Kk]{1}$/.test(rut);
  if (!formatValid) return "El RUT debe tener el formato 12345678-9";
  return validaDV(rut) ? true : "El dígito verificador es inválido";
};

export const passMatchValidator = (pass: string, form: FormularioInput): boolean | string => {
  if (!pass) return "La contraseña es requerida";
  if (pass !== form.password) return "Las contraseñas no coinciden";
  return true;
}
