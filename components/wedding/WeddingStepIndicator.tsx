type StepInfo = {
  number: number;
  label: string;
};

const STEPS: StepInfo[] = [
  { number: 1, label: "Couple" },
  { number: 2, label: "Invitation" },
  { number: 3, label: "Events" },
  { number: 4, label: "Venue" },
  { number: 5, label: "Story" },
  { number: 6, label: "Gallery" },
  { number: 7, label: "Extras" },
  { number: 8, label: "Preview" },
];

type WeddingStepIndicatorProps = {
  currentStep: number;
  onStepClick: (stepNumber: number) => void;
};

export function WeddingStepIndicator({
  currentStep,
  onStepClick,
}: WeddingStepIndicatorProps) {
  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div>
      {/* Desktop Step Indicator */}
      <div className="hidden lg:block overflow-x-auto pb-2">
        <ol className="flex items-center justify-between border-b border-border/70 pb-4 min-w-[36rem]">
          {STEPS.map((step) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <li key={step.number} className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onStepClick(step.number)}
                  className={`flex size-7 items-center justify-center rounded-full text-xs font-semibold transition ${
                    isActive
                      ? "bg-text text-white shadow-soft"
                      : isCompleted
                      ? "bg-primary-soft text-primary-strong font-bold"
                      : "bg-surface-soft text-text-muted hover:text-text"
                  }`}
                >
                  {isCompleted ? "✓" : step.number}
                </button>

                <span
                  className={`text-xs font-medium ${
                    isActive ? "text-text font-bold" : "text-text-muted"
                  }`}
                >
                  {step.label}
                </span>

                {step.number < STEPS.length && (
                  <span className="ml-1 h-px w-4 bg-border/80" />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Mobile Step Progress Bar */}
      <div className="lg:hidden space-y-2 pb-2">
        <div className="flex justify-between items-center text-xs text-text-muted">
          <span className="font-semibold text-text uppercase tracking-wider">
            Step {currentStep} of {STEPS.length}
          </span>
          <span className="font-serif italic text-primary">
            {STEPS[currentStep - 1]?.label}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-surface-soft overflow-hidden">
          <div
            className="h-full bg-text transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
