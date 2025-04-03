"use client";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

import { InitialValues } from "@/app/page";
import { useFormContext } from "@/providers/FormProvider";

export default function MultiStepForm() {
  const { step } = useFormContext<InitialValues>();

  return (
    <div className="p-6 border rounded shadow-md w-full max-w-lg">
      {step === 1 && <StepOne />}
      {step === 2 && <StepTwo />}
      {step === 3 && <StepThree />}
    </div>
  );
}
