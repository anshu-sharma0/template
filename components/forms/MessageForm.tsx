import type { BirthdayWishData, MessageStylePreset } from "@/lib/birthday-types";
import { MESSAGE_PRESETS } from "@/lib/birthday-data";
import { Textarea } from "@/components/ui/Textarea";

type MessageFormProps = {
  data: BirthdayWishData;
  onChange: (updates: Partial<BirthdayWishData>) => void;
  errors?: { message?: string };
};

const PRESET_NAMES: MessageStylePreset[] = [
  "Romantic",
  "Emotional",
  "Cute",
  "Funny",
  "Best Friend",
  "Family",
];

export function MessageForm({ data, onChange, errors }: MessageFormProps) {
  const currentLength = data.message.length;
  const maxLength = 500;

  const handlePresetSelect = (preset: MessageStylePreset) => {
    const presetText = MESSAGE_PRESETS[preset];
    onChange({
      messageStyle: preset,
      message: presetText,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="font-display text-3xl font-normal text-text">
          Tell them what you really want to say.
        </h2>
        <p className="text-sm text-text-muted">
          Write something from the heart. It doesn&apos;t have to be perfect.
        </p>
      </div>

      {/* Message Style Presets */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-text">
          Quick Message Styles / Inspiration
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_NAMES.map((style) => {
            const isSelected = data.messageStyle === style;
            return (
              <button
                key={style}
                type="button"
                onClick={() => handlePresetSelect(style)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                  isSelected
                    ? "border-primary bg-primary-soft text-primary-strong shadow-xs font-semibold"
                    : "border-border bg-surface text-text-muted hover:border-border/80 hover:text-text"
                }`}
              >
                {style}
              </button>
            );
          })}
        </div>
      </div>

      {/* Message Textarea */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-text">
            Personal Message <span className="text-primary">*</span>
          </label>
          <span
            className={`text-xs ${
              currentLength > maxLength ? "text-primary font-bold" : "text-text-muted"
            }`}
          >
            {currentLength} / {maxLength}
          </span>
        </div>

        <Textarea
          id="message"
          rows={6}
          maxLength={maxLength}
          value={data.message}
          onChange={(e) => onChange({ message: e.target.value })}
          placeholder="Happy birthday to the person who makes my life a little brighter every day..."
          className="text-base font-serif leading-relaxed"
        />

        {errors?.message ? (
          <p className="text-xs text-primary font-medium">{errors.message}</p>
        ) : (
          <p className="text-xs text-text-muted">
            That&apos;s the part they&apos;ll remember most. Write from your heart.
          </p>
        )}
      </div>

      {/* Optional Birthday Quote */}
      <div className="pt-4 border-t border-border/60 space-y-2">
        <label htmlFor="quote" className="block text-xs font-semibold uppercase tracking-wider text-text">
          Memorable Birthday Quote <span className="text-text-muted font-normal">(Optional)</span>
        </label>
        <Textarea
          id="quote"
          rows={2}
          value={data.quote || ""}
          onChange={(e) => onChange({ quote: e.target.value })}
          placeholder="e.g. Another year of you means another year of making the world a little softer, a little brighter..."
          className="text-sm font-serif italic"
        />
        <p className="text-xs text-text-muted">
          A poetic quote displayed in an editorial monument card.
        </p>
      </div>
    </div>
  );
}
