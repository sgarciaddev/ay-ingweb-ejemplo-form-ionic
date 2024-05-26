<!-- omit in toc -->
# Ayudantía Ingenieria web y móvil - Ejemplo validación formularios (Ionic/React)

> [!NOTE]
> Para ver la versión de este proyecto utilizando **Ionic/Angular**, haz click [aquí][ejemplo-ng-link].

<!-- omit in toc -->
## Datos

**Ayudante:** Sebastián García Delgadillo ([@sgarciaddev](https://github.com/sgarciaddev)). <br />
**Semestre:** 1er/2024 <br />

<div align="center">

[![ionic-badge-sm]][ionic-web] [![npm-badge-sm]][npm-web] [![react-badge-sm]][react-web] [![ts-badge-sm]][ts-web] [![vscode-badge-sm]][vscode-web]

[![ios-development-badge-sm]][ios-development-web] [![android-development-badge-sm]][android-development-web]

</div>

<!-- omit in toc -->
## Índice

- [Detalles](#detalles)
  - [Ejecución del proyecto](#ejecución-del-proyecto)
  - [Instalación de librería externa](#instalación-de-librería-externa)
  - [Archivos importantes](#archivos-importantes)
  - [Formularios](#formularios)
    - [Componentes de Ionic para formularios](#componentes-de-ionic-para-formularios)
    - [Validación de formularios](#validación-de-formularios)
    - [Validación personalizada](#validación-personalizada)
  - [Lectura de JSON](#lectura-de-json)


## Detalles

Este proyecto contiene un ejemplo de aplicación de Ionic, utilizando React, donde se cubren 2 contenidos principales:

1. Lectura de archivo JSON para cargar las regiones y comunas del país, dentro del formulario.
2. Creación de un formulario utilizando componentes de Ionic y conceptos de desarrollo web. Para este ejemplo, se usó la librería externa `react-hook-form`.

### Ejecución del proyecto

Para ejecutar este proyecto, se debe clonar el repositorio y ejecutar los siguientes comandos en la terminal:

```bash
git clone https://github.com/sgarciaddev/ay-ingweb-ejemplo-form-ionic-react.git

cd ay-ingweb-ejemplo-form-ionic-react

npm install

ionic serve
```

### Instalación de librería externa

Para instalar la librería `react-hook-form`, se debe ejecutar el siguiente comando en la terminal:

```bash
npm install react-hook-form
```

Una vez instalada, se puede importar en el archivo donde se vaya a utilizar:

```typescript
import { useForm } from 'react-hook-form';
```

Puedes ver más información sobre esta librería en su [documentación oficial](https://react-hook-form.com/).

### Archivos importantes

| Nombre archivo                    | Ruta completa              | Descripción                                                                                              |
| :-------------------------------- | :------------------------- | :------------------------------------------------------------------------------------------------------- |
| [`validators.ts`][ruta-archivo1]  | `src/misc/validators.ts`   | Contiene funciones para validaciones personalizadas en el formulario                                     |
| [`Formulario.tsx`][ruta-archivo2] | `src/pages/Formulario.tsx` | Componente de React con el formulario. Contiene la lógica de las validaciones, y el uso de archivo JSON. |
| [`regiones-comunas.json`][ruta-archivo3] | `public/regiones-comunas.json` | Archivo JSON con las regiones y comunas del país. |

### Formularios

Para la creación de formularios utilizando Ionic y React, y utilizando la librería `react-hook-form`, se deben seguir los siguientes pasos:

Primero, identificar los campos del formulario. Para facilitar todo, la idea es crear una `interface` o un `type` que contenga los campos del formulario, y sus tipos de datos. En este ejemplo se creó la siguiente `interface`:
  ```typescript
  export interface FormularioInput {
  nombre: string;
  apellido: string;
  rut: string;
  email: string;
  password: string;
  passwordConfirm: string;
  region: string;
  comuna: string;
  }
  ```

#### Componentes de Ionic para formularios

Luego se debe crear el formulario en el componente de React. Para esto, se deben utilizar los componentes de Ionic dedicados a formularios. Puedes verlos en la [documentación oficial de Ionic](https://ionicframework.com/docs/components). En este ejemplo, se creó el siguiente formulario:
  ```typescript
  <form
    className="ion-padding-vertical"
    onSubmit={handleSubmit(submitFormulario)}
  >
    <IonItem className="flex" lines="full">
      <IonInput
        type="text"
        labelPlacement="stacked"
      >
        <div slot="label">
          Nombre <IonText color="danger">(requerido)</IonText>
        </div>
      </IonInput>
    </IonItem>
    <IonItem lines="full">
      <IonInput
        type="text"
        labelPlacement="stacked"
      >
        <div slot="label">
          Apellido <IonText color="danger">(requerido)</IonText>
        </div>
      </IonInput>
    </IonItem>
    <IonItem lines="full">
      <IonInput
        type="text"
        labelPlacement="stacked"
      >
        <div slot="label">
          RUT <IonText color="danger">(requerido)</IonText>
        </div>
      </IonInput>
    </IonItem>
    <IonItem lines="full">
      <IonInput
        type="text"
        labelPlacement="stacked"
      >
        <div slot="label">
          Email <IonText color="danger">(requerido)</IonText>
        </div>
      </IonInput>
    </IonItem>
    <IonItem lines="full">
      <IonInput
        type="password"
        labelPlacement="stacked"
      >
        <div slot="label">
          Contraseña <IonText color="danger">(requerido)</IonText>
        </div>
        <IonInputPasswordToggle color="medium" slot="end" />
      </IonInput>
    </IonItem>
    <IonItem lines="full">
      <IonInput
        type="password"
        labelPlacement="stacked"
      >
        <div slot="label">
          Confirma tu contraseña{" "}
          <IonText color="danger">(requerido)</IonText>
        </div>
        <IonInputPasswordToggle color="medium" slot="end" />
      </IonInput>
    </IonItem>
    <IonItem lines="full">
      <IonSelect
        interface="action-sheet"
        labelPlacement="stacked"
        onIonChange={handleRegionChange}
      >
        <div slot="label">
          Región <IonText color="danger">(requerido)</IonText>
        </div>
        {regiones &&
          Object.entries(regiones.regiones).map(([key, value]) => (
            <IonSelectOption key={key} value={key}>
              {value.nombre}
            </IonSelectOption>
          ))}
      </IonSelect>
    </IonItem>
    <IonItem lines="full">
      <IonSelect
        interface="action-sheet"
        labelPlacement="stacked"
        disabled={!regSel}
      >
        <div slot="label">
          Comuna <IonText color="danger">(requerido)</IonText>
        </div>
        {regSel &&
          regSel.comunas.map((comuna) => (
            <IonSelectOption key={comuna} value={comuna}>
              {comuna}
            </IonSelectOption>
          ))}
      </IonSelect>
    </IonItem>
    <IonItem className="ion-margin-vertical toc" lines="none">
      <IonToggle
        labelPlacement="start"
        color="success"
        onIonChange={() => setTycChecked(!tycChecked)}
      >
        <p>
          Acepto los términos y condiciones
          <IonText color="danger"> (requerido)</IonText>
        </p>
      </IonToggle>
    </IonItem>
    <IonButton
      expand="full"
      className="ion-padding-horizontal"
      type="submit"
      color={(!isValid || !tycChecked) ? "danger" : "success"}
      disabled={!isValid || !tycChecked}
    >
      {(!isValid || !tycChecked) ? "El formulario no es válido" : "Formulario válido"}
    </IonButton>
  </form>
  ```
Esta es la versión simplificada del formulario. Aún no se han agregado las validaciones, pero podemos observar algunas cosas importantes:
   - Se utilizan los componentes de Ionic para formularios, como `IonInput`, `IonSelect`, `IonSelectOption`, `IonToggle`, entre otros.
   - El `<form>` tiene un evento `onSubmit` que llama a la función `handleSubmit` con la función `submitFormulario` como argumento. Esta función se encarga de enviar los datos del formulario. `handleSubmit` es una función de `react-hook-form`.
   - Se utilizan los atributos `disabled` y `color` de los componentes de Ionic para deshabilitar el botón de envío del formulario si no se cumplen las condiciones de validación.
   - Se utiliza el **estado** `tycChecked` para controlar si el usuario aceptó los términos y condiciones, el estado **tycChecked** se actualiza con el evento `onIonChange` del componente `IonToggle`, `regiones` y `comunas` es información que se obtiene de un archivo JSON, y `regSel` es un estado que indica el estado de la región seleccionada.

Esto lo podemos ver en el archivo [`Formulario.tsx`][ruta-archivo2], en especifico este bloque de código (falta la parte del JSON, lo cubriré mas adelante):
  ```typescript
  import { useEffect, useState } from "react";
  import { SubmitHandler, useForm } from "react-hook-form";

  import { passMatchValidator, rutValidator } from "../misc/validators";

  interface Region {
    nombre: string;
    valor: number;
    comunas: string[];
  }

  interface RegionesJSON {
    regiones: {
      [key: string]: Region;
    };
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormularioInput>({
    mode: "all",
    reValidateMode: "onChange",
  });

  const [regiones, setRegiones] = useState<RegionesJSON | null>(null);
  const [regSel, setRegSel] = useState<Region | null>(null);
  const [tycChecked, setTycChecked] = useState<boolean>(false);

  const handleRegionChange = (e: CustomEvent) => {
    const region = regiones?.regiones[e.detail.value];
    if (region) {
      setRegSel(region);
    }
  };

  const submitFormulario: SubmitHandler<FormularioInput> = (data) => {
    console.log("Formulario enviado");
    console.table(data);
  };
  ```

#### Validación de formularios

Para validar los campos del formulario, debemos seguir los pasos que nos indica la [documentación de `react-hook-form`](https://react-hook-form.com/get-started). En este caso, se crearon funciones personalizadas de validación en el archivo [`validators.ts`][ruta-archivo1]. Estas funciones se importan en el archivo [`Formulario.tsx`][ruta-archivo2], y se utilizan en las validaciones de los campos. Además, la librería también incorpora validaciones por defecto, como `required`, `minLength`, `maxLength`, entre otras. Para agregar validaciones a los campos del formulario, se debe agregar el atributo `...register("nombreCampo", {validaciones})` en el componente de Ionic correspondiente. Por ejemplo, para el campo `nombre`, se agregó lo siguiente:
  ```typescript
  <IonItem className="flex" lines="full">
    <IonInput
      {...register("nombre", {
        required: "El nombre es requerido",
        minLength: {
          value: 3,
          message: "El nombre debe tener al menos 3 caracteres",
        },
        maxLength: {
          value: 20,
          message: "El nombre debe tener como máximo 20 caracteres",
        },
      })}
      className={`${errors.nombre ? "ion-invalid" : "ion-valid"}`}
      type="text"
      labelPlacement="stacked"
    >
      <div slot="label">
        Nombre <IonText color="danger">(requerido)</IonText>
      </div>
    </IonInput>
  </IonItem>
  {errors.nombre && (
    <IonText className="text-xs ml-4" color="danger">
      {errors.nombre.message}
    </IonText>
  )}
  ```
#### Validación personalizada

La validación anterior solo utiliza las validaciones por defecto de `react-hook-form`, y restringimos el campo `nombre` a tener entre 3 y 20 caracteres. Si el campo no cumple con estas validaciones, se muestra un mensaje de error debajo del campo. También podemos poner validaciones personalizadas, como la validación del RUT:
  ```typescript
  <IonItem lines="full">
    <IonInput
      type="text"
      labelPlacement="stacked"
      {...register("rut", {
        validate: rutValidator,
      })}
    >
      <div slot="label">
        RUT <IonText color="danger">(requerido)</IonText>
      </div>
    </IonInput>
  </IonItem>
  {errors.rut && (
    <IonText className="text-xs ml-4" color="danger">
      {errors.rut.message}
    </IonText>
  )}
  ```
Aquí, se utiliza la función `rutValidator` para validar el campo `rut`. Esta función se importa desde el archivo [`validators.ts`][ruta-archivo1], y retorna `true` en caso de que el RUT sea válido, y un mensaje de error (`string`) en caso contrario.
  ```typescript
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
  ```

Así y para cada uno de los campos necesarios se debe agregar la lógica de sus validaciones correspondientes. Las validaciones por defecto de `react-hook-form` son:
   - `required`: Campo requerido.
   - `minLength`: Mínimo de caracteres.
   - `maxLength`: Máximo de caracteres.
   - `pattern`: Patrón de caracteres (regex).
   - `validate`: Validación personalizada (función).
   - `min`: Mínimo de valor (números).
   - `max`: Máximo de valor (números).

### Lectura de JSON

Otra parte importante de este ejemplo es la lectura de un archivo JSON para cargar las regiones y comunas del país. Para esto:

1. Se debe crear un archivo JSON con la información necesaria. En este caso, se creó el archivo [`regiones.json`][ruta-archivo3] en la carpeta `public/assets`.
2. Para leer el archivo, se pueden utilizar 2 alternativas:
  - Utilizar el método `fetch` de JavaScript (**recomendado**) para leer el archivo. Este método retorna una promesa, por lo que se debe utilizar `.then()` para obtener los datos, y luego usar la función `JSON()` para convertir los datos a un objeto JSON. Para usar `fetch`, se debe hacer usando el hook `useEffect` de React, y se debe guardar la información en un **estado**.
  - Importar el archivo directamente en el componente de React. Esto se puede hacer utilizando `import` y la ruta del archivo. Esto solo funciona si el archivo está en la carpeta `src` o en la carpeta `public`, y **no es estándar**.
3. Una vez obtenidos los datos, se pueden utilizar en el componente de React. En este caso, se utilizaron los **estados** `regiones` para guardar la información de las regiones, y `regSel` para guardar la región seleccionada, y poder cargar las comunas correspondientes.

`useEffect()` es un **hook de react** que nos permite controlar el ciclo de vida de un componente funcional. En este caso, se utilizó para cargar la información del archivo JSON **al cargar el componente**. Puedes ver más información sobre `useEffect()` en la [documentación oficial de React](https://reactjs.org/docs/hooks-effect.html). En nuestro ejemplo, la lógica es la siguiente:

```typescript
import { useEffect, useState } from "react";

// Estados para guardar la información de las regiones y la región seleccionada
const [regiones, setRegiones] = useState<RegionesJSON | null>(null);
const [regSel, setRegSel] = useState<Region | null>(null);

// Cargar la información del archivo JSON al cargar el componente
useEffect(() => {
  fetch("/assets/regiones-comunas.json")
    .then((res) => res.json())
    .then((data) => {
      setRegiones(data);
    });
}, []);
```

También se crearon las interfaces `Region` y `RegionesJSON` para tipar la información del archivo JSON. Esto es importante para que TypeScript pueda inferir los tipos de datos, y para que el código sea más legible. Estas interfaces son **propias de este ejemplo**, y deben ser creadas según la estructura del archivo JSON. En este caso, se crearon de la siguiente manera:

```typescript
interface Region {
  nombre: string;
  valor: number;
  comunas: string[];
}

interface RegionesJSON {
  regiones: {
    [key: string]: Region;
  };
}
```

[ejemplo-ng-link]: #
[ruta-archivo1]: ./src/misc/validators.ts
[ruta-archivo2]: ./src/pages/Formulario.tsx
[ruta-archivo3]: ./public/regiones-comunas.json
[ts-badge-sm]: https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat
[ts-web]: https://www.typescriptlang.org/
[react-badge-sm]: https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=fff&style=flat
[react-web]: https://reactjs.org/
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
