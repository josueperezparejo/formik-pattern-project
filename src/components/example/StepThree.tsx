"use client";

import { Form, Formik } from "formik";
import { toast } from "react-toastify";

import { createFieldNameTyped } from "@/lib";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/formik/FormInput";
import { FormSelect } from "@/components/formik/FormSelect";
import { FormCombobox } from "@/components/formik/FormCombobox";
import FormNavigation from "./FormNavigation";
import { useFormContext } from "@/providers/FormProvider";
import { InitialValues } from "@/app/page";
import { useValidationSchema } from "@/hooks";

export default function StepThree() {
  const {
    formValues,
    setFormValues,
    nextStep,
    resetForm,
    initialErrors,
    initialTouched,
  } = useFormContext<InitialValues>();

  const { stepOneSchema, stepTwoSchema, stepThreeSchema } =
    useValidationSchema();

  const validationSchema = stepOneSchema
    .concat(stepTwoSchema)
    .concat(stepThreeSchema);

  const currencyOptions = [
    { id: "ars", value: "ARS", label: "Peso Argentino (ARS)", symbol: "ARS $" },
    { id: "brl", value: "BRL", label: "Real Brasileño (BRL)", symbol: "R$" },
    { id: "cad", value: "CAD", label: "Dólar Canadiense (CAD)", symbol: "C$" },
    { id: "clp", value: "CLP", label: "Peso Chileno (CLP)", symbol: "CLP $" },
    {
      id: "cop",
      value: "COP",
      label: "Peso Colombiano (COP)",
      symbol: "COP $",
    },
    { id: "egp", value: "EGP", label: "Libra Egipcia (EGP)", symbol: "£" },
    { id: "eur", value: "EUR", label: "Euro (EUR)", symbol: "€" },
    { id: "gbp", value: "GBP", label: "Libra Esterlina (GBP)", symbol: "£" },
    { id: "jpy", value: "JPY", label: "Yen Japonés (JPY)", symbol: "¥" },
    { id: "mxn", value: "MXN", label: "Peso Mexicano (MXN)", symbol: "MXN $" },
    { id: "pen", value: "PEN", label: "Sol Peruano (PEN)", symbol: "S/." },
    {
      id: "usd",
      value: "USD",
      label: "Dólar Estadounidense (USD)",
      symbol: "$",
    },
  ];

  const userOptions = [
    { id: 1, label: "Administrador", value: "admin" },
    { id: 2, label: "Editor", value: "editor" },
    { id: 3, label: "Usuario", value: "user" },
  ];

  return (
    <Formik
      initialValues={formValues}
      validationSchema={validationSchema}
      initialErrors={initialErrors}
      initialTouched={initialTouched}
      enableReinitialize={true}
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={(values, { setSubmitting }) => {
        setFormValues({ ...formValues, ...values });
        toast.success(
          <div>
            <p>Form submitted successfully!</p>
            <pre style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>
              {Object.entries(values).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {JSON.stringify(value, null, 2)}
                </div>
              ))}
            </pre>
          </div>
        );
        nextStep();
        setSubmitting(false);
      }}
    >
      {({ values, setFieldValue }) => {
        const { nameTyped } = createFieldNameTyped<InitialValues>();

        return (
          <Form className="flex flex-col gap-4">
            {/* Edad - Input numérico */}
            <FormInput
              label="Edad"
              name={nameTyped("edad")}
              placeholder="Ingresa tu edad"
              type="number"
            />

            {/* Términos y condiciones - Checkbox */}
            <FormInput
              label="Acepto los términos y condiciones"
              name={nameTyped("terminosCondiciones")}
              type="checkbox"
            />

            <FormCombobox
              disabled={false}
              name={nameTyped("userRole")}
              label="Selecciona un rol"
              placeholder="Seleccion su role"
              options={userOptions}
            />

            <FormInput
              disabled={false}
              type="combobox"
              label="Selecciona un rol using FormInput"
              placeholder="Seleccion su role"
              name={nameTyped("userRole")}
              options={userOptions}
              onChangeCallback={() => {
                setFieldValue(
                  nameTyped("userRoleAuto"),
                  values.userRole?.value
                );
              }}
            />

            <FormInput
              disabled={false}
              type="text"
              label="Ingrese su role auto completado"
              placeholder="tu role aqui"
              name={nameTyped("userRoleAuto")}
            />

            <FormSelect
              name={nameTyped("currency")}
              label="Moneda"
              options={currencyOptions}
              placeholder="Selecciona una moneda"
            />

            <FormInput
              disabled={true}
              type="select"
              label="Moneda using FormInput"
              placeholder="Selecciona una moneda"
              options={currencyOptions}
              name={nameTyped("currency")}
            />

            <FormInput
              type="price"
              label="Price"
              name={nameTyped("price")}
              currencyPrefix={values?.currency?.symbol}
              placeholder={`${values?.currency?.symbol || "$"}0.00`}
            />

            <Button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={resetForm}
            >
              Reset Form
            </Button>

            <FormNavigation
              // useDirty
              useIsValid
              // disabled={apiStatus.loading}
              // clearPreviousFields={getClearFieldsObjectFromSchema(
              //   stepThreeSchema
              // )}
            />
          </Form>
        );
      }}
    </Formik>
  );
}
