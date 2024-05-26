<!-- omit in toc -->
# Ayudantía Ingenieria web y móvil - Ejemplo validación formularios (Ionic/Angular)

> [!NOTE]
> Para ver la versión de este proyecto utilizando **Ionic/React**, haz click [aquí][ejemplo-react-link].

<!-- omit in toc -->
## Datos

**Ayudante:** Sebastián García Delgadillo ([@sgarciaddev](https://github.com/sgarciaddev)). <br />
**Semestre:** 1er/2024 <br />

<div align="center">

[![ionic-badge-sm]][ionic-web] [![npm-badge-sm]][npm-web] [![angular-badge-sm]][angular-web] [![ts-badge-sm]][ts-web] [![vscode-badge-sm]][vscode-web]

[![ios-development-badge-sm]][ios-development-web] [![android-development-badge-sm]][android-development-web]

</div>

<!-- omit in toc -->
## Índice

- [Detalles](#detalles)
  - [Ejecución del proyecto](#ejecución-del-proyecto)
  - [Archivos importantes](#archivos-importantes)
  - [Formularios](#formularios)
    - [Componentes de Ionic para formularios](#componentes-de-ionic-para-formularios)
    - [Validación de formularios](#validación-de-formularios)
    - [Validación personalizada](#validación-personalizada)
  - [Lectura de JSON](#lectura-de-json)


## Detalles

Este proyecto contiene un ejemplo de aplicación de Ionic, utilizando Angular, donde se cubren 2 contenidos principales:

1. Lectura de archivo JSON para cargar las regiones y comunas del país, dentro del formulario.
2. Creación y validación de un formulario utilizando componentes de Ionic y conceptos de desarrollo en Angular.

### Ejecución del proyecto

Para ejecutar este proyecto, se debe clonar el repositorio y ejecutar los siguientes comandos en la terminal:

```bash
git clone -b angular https://github.com/sgarciaddev/ay-ingweb-ejemplo-form-ionic.git

cd ay-ingweb-ejemplo-form-ionic

npm install

ionic serve
```

### Archivos importantes

| Nombre archivo                    | Ruta completa              | Descripción                                                                                              |
| :-------------------------------- | :------------------------- | :------------------------------------------------------------------------------------------------------- |
| [`formulario.module.ts`][ruta-archivo1]  | `src/app/formulario/formulario.module.ts`   | Archivo de módulo de la página de formulario. |
| [`Formulario.page.ts`][ruta-archivo2] | `src/app/formulario/formulario.page.ts`   | Archivo con la lógica de la página de formulario. Contiene toda la lógica de validación de formularios. |
| [`Formulario.page.html`][ruta-archivo3] | `src/app/formulario/formulario.page.html`   | Archivo HTML de la página de formulario. Contiene la estructura del formulario. |
| [`regiones.service.ts`][ruta-archivo4] | `src/app/misc/regiones.service.ts`   | Servicio de Angular para cargar las regiones y comunas del país. |
| [`Form-errors.ts`][ruta-archivo5] | `src/app/misc/form-errors.ts`   | Archivo con los mensajes de error de los campos del formulario. |
| [`Form-validations.ts`][ruta-archivo6] | `src/app/misc/form-validators.ts`   | Archivo con las funciones de validación de los campos del formulario. |
| [`regiones-comunas.json`][ruta-archivo7] | `src/assets/regiones-comunas.json`   | Archivo JSON con la información de las regiones y comunas del país. |

### Formularios

Para la creaciónd de formularios utilizando Ionic y Angular, se deben seguir los siguientes pasos:

Primero hay que agregar las importaciones necesarias en los archivos de Angular, para poder trabajar con formularios. Esto lo hacemos de la siguiente manera:

1. En el archivo de **módulo** del componente o página, se deben importar los módulos necesarios para trabajar con formularios. En este caso, se importaron los módulos `ReactiveFormsModule` y `FormsModule` de Angular:
  ```typescript
  import { ReactiveFormsModule, FormsModule } from "@angular/forms";
  ```
2. Luego, se deben agregar estos módulos al arreglo de `imports` del módulo:
  ```typescript
  @NgModule({
    imports: [
      ...
      FormsModule,
      ReactiveFormsModule,
    ],
  });
  ```
3. En el archivo de **componente** o **página**, se deben importar las clases necesarias para trabajar con formularios. En este caso, se importaron las clases `FormGroup`, `FormControl`, `Validators` y `FormBuilder` de Angular:
  ```typescript
  import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
  ```
4. Luego, se deben crear las instancias necesarias para trabajar con formularios. En este caso, se creó un atributo `formulario` de tipo `FormGroup` en el componente:
  ```typescript
  @Component({
    selector: 'app-formulario',
    templateUrl: 'formulario.page.html',
  })
  export class FormularioPage {
    formulario: FormGroup;
    ...
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
  }}
  ```

En el ejemplo anterior, podemos ver que dentro del constructor del componente, se inicializa el formulario con los campos requeridos y las validaciones necesarias. En este caso, se utilizan las validaciones por defecto de Angular, como `required`, `minLength`, `maxLength`, `email`, entre otras. Además, se utilizan validaciones personalizadas, como `rutValidator` y `passwordMatchValidator`. Estas funciones se importan desde el archivo [`form-validators.ts`][ruta-archivo6]. Ya con esto configurado, podemos proceder a crear el formulario en el archivo HTML.

#### Componentes de Ionic para formularios

Luego se debe crear el formulario en el componente de Angular. Para esto, se deben utilizar los componentes de Ionic dedicados a formularios. Puedes verlos en la [documentación oficial de Ionic](https://ionicframework.com/docs/components). En este ejemplo, se creó el siguiente formulario:
  ```html
  <form [formGroup]="formulario" (ngSubmit)="onSubmit()">
    <ion-item>
      <ion-input
        type="text"
        formControlName="nombre"
        labelPlacement="stacked"
        [errorText]="formError('nombre')"
      >
        <div slot="label">Nombre <ion-text color="danger">(requerido)</ion-text></div>
      </ion-input>
    </ion-item>

    <ion-item lines="none">
      <ion-input
        type="text"
        formControlName="apellido"
        labelPlacement="stacked"
        [errorText]="formError('apellido')"
      >
        <div slot="label">Apellido <ion-text color="danger">(requerido)</ion-text></div>
      </ion-input>
    </ion-item>

    <ion-item lines="none">
      <ion-input
        type="text"
        formControlName="rut"
        labelPlacement="stacked"
        [errorText]="formError('rut')"
      >
        <div slot="label">RUT <ion-text color="danger">(requerido)</ion-text></div>
      </ion-input>
    </ion-item>

    <ion-item lines="none">
      <ion-input
        type="email"
        formControlName="email"
        labelPlacement="stacked"
        [errorText]="formError('email')"
      >
        <div slot="label">Email <ion-text color="danger">(requerido)</ion-text></div>
      </ion-input>
    </ion-item>

    <ion-item lines="none">
      <ion-input
        type="password"
        formControlName="password"
        labelPlacement="stacked"
        [errorText]="formError('password')"
      >
        <div slot="label">Contraseña <ion-text color="danger">(requerido)</ion-text></div>
        <ion-input-password-toggle color="medium" slot="end"></ion-input-password-toggle>
      </ion-input>
    </ion-item>
    
    <ion-item lines="none">
      <ion-input
        type="password"
        formControlName="passwordConfirm"
        labelPlacement="stacked"
        [errorText]="formError('passwordConfirm')"
      >
        <div slot="label">Confirma tu contraseña <ion-text color="danger">(requerido)</ion-text></div>
        <ion-input-password-toggle color="medium" slot="end"></ion-input-password-toggle>
      </ion-input>
    </ion-item>

    <ion-item lines="full">
      <ion-select
        formControlName="region"
        interface="action-sheet"
        labelPlacement="stacked"
        (ionChange)="onRegionChange()"
      >
        <div slot="label">Región <ion-text color="danger">(requerido)</ion-text></div>

        <ion-select-option
          *ngFor="let region of regiones"
          [value]="region.valor"
        >
          {{region.nombre}}
        </ion-select-option
        >
      </ion-select>
    </ion-item>

    <ion-item lines="full">
      <ion-select
        formControlName="comuna"
        interface="action-sheet"
        labelPlacement="stacked"
      >
      <div slot="label">Comuna <ion-text color="danger">(requerido)</ion-text></div>
        <ion-select-option
          *ngFor="let comuna of comunas"
          [value]="comuna"
        >
          {{comuna}}
        </ion-select-option
        >
      </ion-select>
    </ion-item>

    <ion-item class="ion-margin-vertical" lines="none">
      <ion-toggle formControlName="tyc" labelPlacement="start" color="success">
        Acepto los términos y condiciones <ion-text color="danger">(requerido)</ion-text>
      </ion-toggle>
    </ion-item>

    <ion-button
      expand="full"
      class="ion-padding"
      type="submit"
      [color]="btnColor"
      [disabled]="!formulario.valid"
      >{{btnText}}</ion-button
    >
  </form>
  ```

En este formulario, se utilizan los componentes de Ionic para formularios, como `ion-input`, `ion-select`, `ion-toggle`, entre otros. Cada componente tiene un atributo `formControlName` que se corresponde con el nombre del campo en el formulario de Angular. Además, se utilizan los atributos `labelPlacement`, `errorText`, `interface`, `ionChange`, entre otros, para personalizar el formulario. También se utilizan los atributos `disabled` y `color` de los componentes de Ionic para deshabilitar el botón de envío del formulario si no se cumplen las condiciones de validación.

#### Validación de formularios

La validación de formularios con Angular se realiza al momento de crear el formulario en el componente. En este caso, se utilizan las validaciones por defecto de Angular, como `required`, `minLength`, `maxLength`, `email`, entre otras. Para mostrar los mensajes de error en el formulario, se utilizan los elementos que se encuentran en el archivo [`form-errors.ts`][ruta-archivo5]. Estos elementos se utilizan en el archivo HTML del formulario, y se muestran debajo de los campos correspondientes.

#### Validación personalizada

Además, se utilizan validaciones personalizadas, como `rutValidator` y `passwordMatchValidator`. Estas funciones se importan desde el archivo [`form-validators.ts`][ruta-archivo6]. La validación personalizada se realiza en el archivo de componente, y se utiliza en el formulario de la siguiente manera:
  ```typescript
  this.formulario = this.fb.group({
    ...
    rut: ['', [Validators.required, rutValidator]],
    ...
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    passwordConfirm: ['', [Validators.required, passwordMatchValidator]],
    ...
  });
  ```

Por ejemplo, la validación del RUT se realiza con la función `rutValidator`, que se encuentra en el archivo [`form-validators.ts`][ruta-archivo6]. 

```typescript
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
```

En este caso, la función `rutValidator` valida el formato y el dígito verificador de un RUT. Si el RUT es válido, la función retorna `null`, si no, **retorna un objeto con la validación correspondiente (par clave/true)**. Esta función se utiliza en el formulario para validar el campo del RUT.

### Lectura de JSON

Otra parte importante de este ejemplo es la lectura de un archivo JSON para cargar las regiones y comunas del país. Para esto:

1. Se debe crear un archivo JSON con la información necesaria. En este caso, se creó el archivo [`regiones.json`][ruta-archivo3] en la carpeta `public/assets`.
2. Para cargar la información del archivo JSON, se debe crear un **servicio de Angular**. En este caso, se creó el archivo [`regiones.service.ts`][ruta-archivo4] en la carpeta `src/app/misc`. Este servicio se encarga de cargar la información del archivo JSON y devolverla en un formato adecuado, y para ello utiliza el módulo `HttpClient` de Angular. Para poder utilizar este módulo, se debe importar el módulo `HttpClientModule` **en el archivo de módulo de la aplicación** (`app.module.ts`).
  ```typescript
  import { HttpClientModule } from '@angular/common/http';
  ...

  @NgModule({
    declarations: [AppComponent],
    imports: [..., HttpClientModule],
    providers: [...],
    bootstrap: [AppComponent],
  })
  export class AppModule {}
  ```
1. Una vez obtenidos los datos, se pueden utilizar en el componente de Angular. En este caso, se utilizó el archivo [`formulario.page.ts`][ruta-archivo2] para cargar las regiones y comunas del país. Para esto, se utilizó el servicio `RegionesService` en el constructor del componente, y se llamó al método `getRegiones()` para obtener la información del archivo JSON.

También se creó la interfaz `RegionesJSON` para tipar la información del archivo JSON. Esto es importante para que TypeScript pueda inferir los tipos de datos, y para que el código sea más legible. Estas interfaces son **propias de este ejemplo**, y deben ser creadas según la estructura del archivo JSON. En este caso, se crearon de la siguiente manera:

```typescript
interface RegionesJSON {
  regiones: {
    [key: string]: {
      nombre: string;
      valor: number;
      comunas: string[];
    };
  };
}
```

Toda la lógica de la validación, mensajes de error, y carga de regiones y comunas se encuentra en el archivo [`formulario.page.ts`][ruta-archivo2]. En este archivo, se utilizan los métodos del servicio `RegionesService` para cargar la información del archivo JSON, y se utilizan las funciones de validación para validar los campos del formulario.

[ejemplo-react-link]: https://github.com/sgarciaddev/ay-ingweb-ejemplo-form-ionic/tree/react
[ruta-archivo1]: ./src/app/formulario/formulario.module.ts
[ruta-archivo2]: ./src/app/formulario/formulario.page.ts
[ruta-archivo3]: ./src/app/formulario/formulario.page.html
[ruta-archivo4]: ./src/app/misc/regiones.service.ts
[ruta-archivo5]: ./src/app/misc/form-errors.ts
[ruta-archivo6]: ./src/app/misc/form-validators.ts
[ruta-archivo7]: ./src/assets/regiones-comunas.json
[ts-badge-sm]: https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat
[ts-web]: https://www.typescriptlang.org/
[npm-badge-sm]: https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff&style=flat
[npm-web]: https://www.npmjs.com/
[vscode-badge-sm]: https://img.shields.io/badge/Visual_Studio_Code-007ACC?logo=visual-studio-code&logoColor=fff&style=flat
[vscode-web]: https://code.visualstudio.com/
[ionic-badge-sm]: https://img.shields.io/badge/Ionic-3880FF?logo=ionic&logoColor=fff&style=flat
[ionic-web]: https://ionicframework.com/
[ios-development-badge-sm]: https://img.shields.io/badge/iOS_Development-000000?logo=ios&logoColor=fff&style=flat
[ios-development-web]: https://developer.apple.com/ios/
[android-development-badge-sm]: https://img.shields.io/badge/Android_Development-3DDC84?logo=android&logoColor=fff&style=flat
[android-development-web]: https://developer.android.com/

[angular-badge-sm]: https://img.shields.io/badge/Angular-DD0031?logo=angular&logoColor=fff&style=flat
[angular-web]: https://angular.io/
