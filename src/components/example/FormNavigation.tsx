"use client";

import { useFormikContext } from "formik";
import { useTranslations } from "next-intl";

import { InitialValues } from "@/app/page";
import { useFormContext } from "@/providers/FormProvider";

import { Button } from "@/components/ui/button";
import { LanguageSelector } from "../miscellaneous/LanguageSelector";

interface Props {
  useIsValid?: boolean;
  useDirty?: boolean;
  disabled?: boolean;
  clearPreviousFields?: { [key: string]: string };
}

export default function FormNavigation({
  disabled,
  clearPreviousFields,
  useDirty,
  useIsValid,
}: Props) {
  const t = useTranslations("Botones");
  const {
    step,
    totalSteps,
    prevStep,
    formValues,
    setFormValues,
    setInitialTouched,
    setInitialErrors,
  } = useFormContext<InitialValues>();

  const { isValid, dirty, validateForm } = useFormikContext<InitialValues>();

  const isLastStep = step === totalSteps;

  const handleAtras = async () => {
    // Permite validar los campos al ir atras, en caso de traer autoFilled con datos que no pasen la validacion del formulario
    const touchedFields = Object.keys(formValues).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );

    const validationErrors = await validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setInitialTouched(touchedFields);
      setInitialErrors(validationErrors);
    }

    if (clearPreviousFields) {
      setFormValues({ ...formValues, ...clearPreviousFields });
    }

    prevStep();
  };

  return (
    <div>
      <div className="flex justify-between mt-4">
        {step > 1 && (
          <Button
            disabled={disabled}
            type="button"
            onClick={handleAtras}
            className="p-2 bg-gray-500 text-white rounded"
          >
            {t("anterior")}
          </Button>
        )}

        <Button
          type="submit"
          variant="default"
          disabled={
            (useIsValid && !isValid) || (useDirty && !dirty) || disabled
          }
          className={`p-2 rounded ${
            (useIsValid && !isValid) || (useDirty && !dirty) || disabled
              ? "bg-red-300 cursor-not-allowed"
              : isLastStep
              ? "bg-green-500"
              : "bg-blue-500"
          } text-white`}
        >
          {isLastStep ? t("finalizar") : t("siguiente")}
        </Button>
      </div>

      <div className="flex justify-center">
        <LanguageSelector />
      </div>
    </div>
  );
}
