"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormInput } from "@/components/formik/FormInput";
import { FormSelect } from "@/components/formik/FormSelect";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

import {
  createFieldNameTyped,
  createFieldValueTyped,
  getClearFieldsObjectFromSchema,
} from "@/lib/formik";
import FormNavigation from "./FormNavigation";
import { useFormContext } from "@/providers/FormProvider";
import { useValidationSchema } from "@/hooks";
import { InitialValues } from "@/app/page";

// import { getClearFieldsObjectFromSchema } from "@/lib/formik";

export default function StepTwo() {
  const { nextStep, formValues, setFormValues, initialTouched, initialErrors } =
    useFormContext<InitialValues>();

  const { stepOneSchema, stepTwoSchema } = useValidationSchema();

  const validationSchema = stepOneSchema.concat(stepTwoSchema);

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
      {({ setFieldValue, values }) => {
        const { setFieldValueTyped } =
          createFieldValueTyped<InitialValues>(setFieldValue);

        const { nameTyped } = createFieldNameTyped<InitialValues>();
        return (
          <Form className="flex flex-col gap-4">
            {/* Categoría - Select */}
            <FormSelect
              name={nameTyped("categoria")}
              label="Categoría"
              options={[
                { label: "Tecnología", value: "tecnologia" },
                { label: "Marketing", value: "marketing" },
                { label: "Diseño", value: "diseno" },
                { label: "Desarrollo", value: "desarrollo" },
                { label: "Otro", value: "otro" },
              ]}
              placeholder="Selecciona una categoría"
            />

            <FormInput
              type="text"
              name={nameTyped("apodo")}
              label="Apodo"
              placeholder="Your apodo"
            />

            {/* Fecha de nacimiento - Calendario */}
            <div className="space-y-2">
              <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !values.fechaNacimiento && "text-muted-foreground",
                      initialErrors.fechaNacimiento &&
                        initialTouched.fechaNacimiento
                        ? "border-red-500"
                        : ""
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {values.fechaNacimiento ? (
                      format(values.fechaNacimiento, "PPP")
                    ) : (
                      <span>Selecciona una fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={values.fechaNacimiento}
                    onSelect={(date) => setFieldValue("fechaNacimiento", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <ErrorMessage
                name={nameTyped("fechaNacimiento")}
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            {/* Género - Radio buttons */}
            <div className="space-y-2">
              <Label>Género</Label>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <Field
                    type="radio"
                    name={nameTyped("genero")}
                    value="masculino"
                    id="masculino"
                  />
                  <Label htmlFor="masculino">Masculino</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Field
                    type="radio"
                    name={nameTyped("genero")}
                    value="femenino"
                    id="femenino"
                  />
                  <Label htmlFor="femenino">Femenino</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Field
                    type="radio"
                    name={nameTyped("genero")}
                    value="otro"
                    id="otro"
                  />
                  <Label htmlFor="otro">Otro</Label>
                </div>
              </div>
              <ErrorMessage
                name={nameTyped("genero")}
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            {/* Notificaciones - Switch */}
            <div className="flex items-center space-x-2">
              <Switch
                name={nameTyped("notificaciones")}
                id="notificaciones"
                checked={values.notificaciones}
                onCheckedChange={(checked) => {
                  setFieldValueTyped("notificaciones", checked);
                }}
              />

              <Label htmlFor="notificaciones">Recibir notificaciones</Label>
            </div>

            <FormInput
              disabled={true}
              label="Recibir notificaciones reutilizable"
              name={nameTyped("notificaciones")}
              type="switch"
            />

            <FormNavigation
              clearPreviousFields={getClearFieldsObjectFromSchema(
                stepTwoSchema
              )}
            />
          </Form>
        );
      }}
    </Formik>
  );
}
