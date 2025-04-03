import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

import { InitialValues } from "@/app/page";
import { useFormContext } from "@/providers/FormProvider";

const ProgressIndicator = () => {
  const { step, totalSteps, formValues } = useFormContext<InitialValues>();
  console.log("🚀 ~ ProgressIndicator ~ formValues:", formValues.apellido);

  const steps = Array.from({ length: totalSteps }, (_, index) => ({
    id: index + 1,
  }));

  return (
    <div className={cn("py-4")}>
      <div className="flex items-center space-x-4">
        {/* Indicadores de pasos dinámicos */}
        {steps.map((stepper) => {
          const isCompleted = step > stepper.id;
          const isCurrent = step === stepper.id;

          return (
            <div
              key={stepper.id}
              className="relative flex flex-col items-center"
            >
              {/* Círculo para el paso */}
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full  transition-all duration-300",
                  isCompleted
                    ? "bg-primary text-white "
                    : isCurrent
                    ? "bg-background border-blue-700 border-2  text-primary"
                    : "bg-gray-200 text-gray-400"
                )}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6 " />
                ) : (
                  <span className="font-semibold">{stepper.id}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
