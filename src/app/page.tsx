"use client";

import { useTranslations } from "next-intl";

import { useAutoFilled } from "@/hooks";
import { FormProvider } from "@/providers/FormProvider";

import MultiStepForm from "@/components/example/MultiStepForm";
import ProgressIndicator from "@/components/example/ProgressIndicator";

export type Categoria = {
  label: string;
  value: string;
};

type Currency = { id: string; value: string; label: string; symbol: string };
type UserRole = { label: string; value: string; id: number };
export interface InitialValues {
  nombre: string;
  apellido: string;
  apodo: string;
  email: string;
  password: string;
  confirmPassword: string;
  descripcion: string;
  categoria: Categoria | "";
  fechaNacimiento: Date;
  genero: "masculino" | "femenino" | "otro" | "";
  notificaciones: boolean;
  edad: string;
  terminosCondiciones: boolean;
  userRole: UserRole | undefined;
  userRoleAuto: string;
  currency: Currency | undefined;
  price: number | undefined;
  friends: [
    {
      name: string;
      lastName: string;
    }
  ];
}

const initialValues: InitialValues = {
  nombre: "",
  apellido: "",
  apodo: "",
  email: "",
  password: "",
  confirmPassword: "",
  descripcion: "",
  categoria: "",
  fechaNacimiento: new Date(),
  genero: "",
  notificaciones: false,
  edad: "",
  terminosCondiciones: false,
  userRole: undefined,
  userRoleAuto: "",
  currency: undefined,
  price: undefined,
  friends: [
    {
      name: "",
      lastName: "",
    },
  ],
};

export default function FormikMultiStep() {
  const t = useTranslations("HomePage");

  const { isLoading, data } = useAutoFilled();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <FormProvider
      formKey="crear-usuario"
      totalSteps={3}
      useLocalStorage={false}
      initialStep={data?.currentStep || 1}
      // initialStep={1}
      autoFilledValues={data?.formData}
      initialValues={initialValues}
    >
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ProgressIndicator />
        <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
        <MultiStepForm />
      </div>
    </FormProvider>
  );
}
