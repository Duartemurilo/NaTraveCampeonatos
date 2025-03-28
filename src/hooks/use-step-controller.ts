// hooks/use-step-controller.ts
import { useState, useCallback } from "react";

export function useStepController<T>(steps: T[]) {
  const [activeStep, setActiveStep] = useState(0);

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;

  const currentStep = steps[activeStep];

  const goToStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex >= 0 && stepIndex < steps.length) {
        setActiveStep(stepIndex);
      }
    },
    [steps.length]
  );

  const goNext = useCallback(() => {
    if (!isLastStep) setActiveStep((prev) => prev + 1);
  }, [isLastStep]);

  const goBack = useCallback(() => {
    if (!isFirstStep) setActiveStep((prev) => prev - 1);
  }, [isFirstStep]);

  const reset = useCallback(() => setActiveStep(0), []);

  return {
    activeStep,
    currentStep,
    isFirstStep,
    isLastStep,
    goNext,
    goBack,
    goToStep,
    reset,
    setActiveStep,
  };
}
