"use client";

import { Formik, Form, FieldArray } from "formik";

import {
  createFieldNameTyped,
  getClearFieldsObjectFromSchema,
} from "@/lib/formik";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/formik/FormInput";
import { useFormContext } from "@/providers/FormProvider";

import FormNavigation from "./FormNavigation";

import { InitialValues } from "@/app/page";
import { useValidationSchema } from "@/hooks";

export default function StepOne() {
  const { formValues, setFormValues, nextStep, initialErrors, initialTouched } =
    useFormContext<InitialValues>();

  const { stepOneSchema } = useValidationSchema();

  const validationSchema = stepOneSchema;

  return (
    <Formik
      initialValues={formValues}
      validationSchema={validationSchema}
      initialErrors={initialErrors}
      initialTouched={initialTouched}
      enableReinitialize={true}
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={(values) => {
        setFormValues({ ...formValues, ...values });
        nextStep();
      }}
    >
      {({ values }) => {
        const { nameTyped, dynamicNameTyped } =
          createFieldNameTyped<InitialValues>();

        return (
          <Form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Nombre - Input de texto */}
              <FormInput
                label="Nombre"
                name={nameTyped("nombre")}
                type="text"
                placeholder="Escribe tu nombre completo"
              />
              <FormInput
                label="Apellidos"
                name={nameTyped("apellido")}
                type="text"
                placeholder="Escribe tu nombre completo"
              />
            </div>

            {/* Email - Input de email */}
            <FormInput
              label="Correo electrónico"
              name={nameTyped("email")}
              type="email"
              placeholder="tu@email.com"
            />

            {/* Password - Input de contraseña */}
            <FormInput
              label="Contraseña"
              name={nameTyped("password")}
              type="password"
              placeholder="********"
            />

            {/* Confirm Password - Input de confirmar contraseña */}
            <FormInput
              label="Confirmar contraseña"
              name={nameTyped("confirmPassword")}
              type="password"
              placeholder="********"
            />

            {/* Descripción - Textarea */}
            <FormInput
              // disabled={true}
              type="textarea"
              label="Descripción"
              name={nameTyped("descripcion")}
              placeholder="Cuéntanos sobre ti..."
            />

            <h2 className="font-semibold">List of Friends</h2>

            <FieldArray name={nameTyped("friends")}>
              {({ remove, push }) => (
                <>
                  {values.friends.length > 0 &&
                    values.friends.map((friend, index) => (
                      <div
                        className="flex items-center justify-between gap-2 "
                        key={index}
                      >
                        <Button
                          variant="destructive"
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </Button>

                        <FormInput
                          type="text"
                          label="Name"
                          placeholder="Your name"
                          name={dynamicNameTyped("friends.0.name", index)}
                        />

                        <FormInput
                          type="text"
                          label="Lastname"
                          placeholder="Your lastname"
                          name={dynamicNameTyped("friends.0.lastName", index)}
                        />
                      </div>
                    ))}

                  <Button
                    type="button"
                    className="secondary"
                    onClick={() => push({ name: "", lastName: "" })}
                  >
                    Add Friend
                  </Button>
                </>
              )}
            </FieldArray>

            {/* Botón de envío */}
            <FormNavigation
              useDirty={false}
              useIsValid={false}
              clearPreviousFields={getClearFieldsObjectFromSchema(
                stepOneSchema
              )}
            />
          </Form>
        );
      }}
    </Formik>
  );
}
