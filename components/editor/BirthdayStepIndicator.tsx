type StepInfo = {
  number: number;
  label: string;
};

const STEPS: StepInfo[] = [
  { number: 1, label: "Recipient" },
  { number: 2, label: "Message" },
  { number: 3, label: "Memories" },
  { number: 4, label: "Atmosphere" },
  { number: 5, label: "Preview" },
];

type BirthdayStepIndicatorProps = {
  currentStep: number;
  onStepClick: (stepNumber: number) => void;
};

export function BirthdayStepIndicator({
  currentStep,
  onStepClick,
}: BirthdayStepIndicatorProps) {
  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div>
      {/* Desktop Step Indicator */}
      <div className="hidden sm:block">
        <ol className="flex items-center justify-between border-b border-border/70 pb-4">
          {STEPS.map((step) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <li key={step.number} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onStepClick(step.number)}
                  className={`flex size-8 items-center justify-center rounded-full text-xs font-semibold transition ${
                    isActive
                      ? "bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-rose)] text-white shadow-love-card"
                      : isCompleted
                      ? "bg-[var(--love-surface-rose)] text-[var(--love-crimson)] font-bold"
                      : "bg-[var(--love-surface-blush)] text-[var(--love-text-muted)] hover:text-[var(--love-text-heading)]"
                  }`}
                >
                  {isCompleted ? "✓" : `0${step.number}`}
                </button>

                <span
                  className={`text-xs font-medium ${
                    isActive ? "text-[var(--love-text-heading)] font-bold" : "text-[var(--love-text-muted)]"
                  }`}
                >
                  {step.label}
                </span>

                {step.number < STEPS.length && (
                  <span className="ml-2 h-px w-6 bg-[var(--love-border)]" />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Mobile Step Progress Bar */}
      <div className="sm:hidden space-y-2 pb-2">
        <div className="flex justify-between items-center text-xs text-[var(--love-text-muted)]">
          <span className="font-semibold text-[var(--love-text-heading)] uppercase tracking-wider">
            Step {currentStep} of {STEPS.length}
          </span>
          <span className="font-serif italic text-[var(--love-crimson)]">
            {STEPS[currentStep - 1]?.label}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-[var(--love-surface-blush)] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
