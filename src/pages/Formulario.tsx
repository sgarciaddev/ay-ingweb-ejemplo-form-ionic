import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";

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

const Formulario: React.FC = () => {
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

  useEffect(() => {
    fetch("/regiones-comunas.json").then((res) => {
      res.json().then((data: RegionesJSON) => {
        setRegiones(data);
      });
    });
  }, []);

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

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Formulario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form
          className="ion-padding-vertical"
          onSubmit={handleSubmit(submitFormulario)}
        >
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
          <IonItem lines="full">
            <IonInput
              type="text"
              labelPlacement="stacked"
              {...register("apellido", {
                required: "El apellido es requerido",
                minLength: {
                  value: 3,
                  message: "El apellido debe tener al menos 3 caracteres",
                },
                maxLength: {
                  value: 20,
                  message: "El apellido debe tener como máximo 20 caracteres",
                },
              })}
            >
              <div slot="label">
                Apellido <IonText color="danger">(requerido)</IonText>
              </div>
            </IonInput>
          </IonItem>
          {errors.apellido && (
            <IonText className="text-xs ml-4" color="danger">
              {errors.apellido.message}
            </IonText>
          )}
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
          <IonItem lines="full">
            <IonInput
              type="text"
              labelPlacement="stacked"
              {...register("email", {
                required: {
                  value: true,
                  message: "El email es requerido",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "El email no es válido",
                },
              })}
            >
              <div slot="label">
                Email <IonText color="danger">(requerido)</IonText>
              </div>
            </IonInput>
          </IonItem>
          {errors.email && (
            <IonText className="text-xs ml-4" color="danger">
              {errors.email.message}
            </IonText>
          )}
          <IonItem lines="full">
            <IonInput
              type="password"
              labelPlacement="stacked"
              {...register("password", {
                required: "La contraseña es requerida",
              })}
            >
              <div slot="label">
                Contraseña <IonText color="danger">(requerido)</IonText>
              </div>
              <IonInputPasswordToggle color="medium" slot="end" />
            </IonInput>
          </IonItem>
          {errors.password && (
            <IonText className="text-xs ml-4" color="danger">
              {errors.password.message}
            </IonText>
          )}
          <IonItem lines="full">
            <IonInput
              type="password"
              labelPlacement="stacked"
              {...register("passwordConfirm", {
                required: "Debes confirmar tu contraseña",
                validate: passMatchValidator
              })}
            >
              <div slot="label">
                Confirma tu contraseña{" "}
                <IonText color="danger">(requerido)</IonText>
              </div>
              <IonInputPasswordToggle color="medium" slot="end" />
            </IonInput>
          </IonItem>
          {errors.passwordConfirm && (
            <IonText className="text-xs ml-4" color="danger">
              {errors.passwordConfirm.message}
            </IonText>
          )}
          <IonItem lines="full">
            <IonSelect
              interface="action-sheet"
              labelPlacement="stacked"
              onIonChange={handleRegionChange}
              {...register("region", {
                required: "La región es requerida",
              })}
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
          {errors.region && (
            <IonText className="text-xs ml-4" color="danger">
              {errors.region.message}
            </IonText>
          )}
          <IonItem lines="full">
            <IonSelect
              interface="action-sheet"
              labelPlacement="stacked"
              disabled={!regSel}
              {...register("comuna", {
                required: "La comuna es requerida",
              })}
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
          {errors.comuna && (
            <IonText className="text-xs ml-4" color="danger">
              {errors.comuna.message}
            </IonText>
          )}
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
      </IonContent>
    </IonPage>
  );
};

export default Formulario;
