import type { BirthdayWishData, RelationshipOption } from "@/lib/birthday-types";
import { RELATIONSHIP_OPTIONS } from "@/lib/birthday-data";
import { Input } from "@/components/ui/Input";

type RecipientFormProps = {
  data: BirthdayWishData;
  onChange: (updates: Partial<BirthdayWishData>) => void;
  errors?: { recipientName?: string };
};

export function RecipientForm({ data, onChange, errors }: RecipientFormProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="font-display text-3xl font-normal text-text">
          Who is this special wish for?
        </h2>
        <p className="text-sm text-text-muted">
          Start with their name so we can personalize every detail of their surprise.
        </p>
      </div>

      {/* Recipient Name (Required) */}
      <div className="space-y-2">
        <label htmlFor="recipientName" className="block text-xs font-semibold uppercase tracking-wider text-text">
          Their Name <span className="text-primary">*</span>
        </label>
        <Input
          id="recipientName"
          value={data.recipientName}
          onChange={(e) => onChange({ recipientName: e.target.value })}
          placeholder="Their name (e.g. Khushi)"
          className="text-lg"
          autoFocus
        />
        {errors?.recipientName ? (
          <p className="text-xs text-primary font-medium">{errors.recipientName}</p>
        ) : (
          <p className="text-xs text-text-muted">This will appear prominently on their birthday surprise.</p>
        )}
      </div>

      {/* Relationship Preset Selection */}
      <div className="space-y-2.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-text">
          Relationship <span className="text-text-muted font-normal">(Optional)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {RELATIONSHIP_OPTIONS.map((rel) => {
            const isSelected = data.relationship === rel;
            return (
              <button
                key={rel}
                type="button"
                onClick={() =>
                  onChange({ relationship: isSelected ? "" : (rel as RelationshipOption) })
                }
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${isSelected
                    ? "border-primary bg-primary text-white shadow-xs"
                    : "border-border bg-surface text-text-muted hover:border-border/80 hover:text-text"
                  }`}
              >
                {rel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Age & Birthday Date (Optional) */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="age" className="block text-xs font-semibold uppercase tracking-wider text-text">
            Are they celebrating a special age? <span className="text-text-muted font-normal">(Optional)</span>
          </label>
          <Input
            id="age"
            value={data.age || ""}
            onChange={(e) => onChange({ age: e.target.value })}
            placeholder="e.g. 25"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="birthDate" className="block text-xs font-semibold uppercase tracking-wider text-text">
            Birthday Date <span className="text-text-muted font-normal">(Optional)</span>
          </label>
          <Input
            id="birthDate"
            type="date"
            value={data.birthDate || ""}
            onChange={(e) => onChange({ birthDate: e.target.value })}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-border/60 space-y-4">
        <div className="space-y-1">
          <h3 className="font-display text-2xl text-text font-normal">
            And who is sending this little surprise?
          </h3>
          <p className="text-xs text-text-muted">
            Your name will be signed at the bottom of the personal note.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="senderName" className="block text-xs font-semibold uppercase tracking-wider text-text">
            Your Name <span className="text-text-muted font-normal">(Optional)</span>
          </label>
          <Input
            id="senderName"
            value={data.senderName || ""}
            onChange={(e) => onChange({ senderName: e.target.value })}
            placeholder="Your name (e.g. Akshat)"
          />
        </div>
      </div>
    </div>
  );
}
